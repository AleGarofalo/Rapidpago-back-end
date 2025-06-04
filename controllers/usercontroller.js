const { json } = require("express");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const PasswordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../middleware/errorhandler");
const { sendEmail, resendLink } = require("../services/Email");
const { createAndSendRegistrationToken } = require("../services/TokenCreate");
const User = require("../models/User");
const userview = require("../models/Userview");
const Role = require("../models/Role");
const Business = require("../models/Business");
const ValidationType = require("../models/ValidationTypes");
const Validation = require("../models/Validation");
const businesses_users = require("../models/Businesses_users");
const moment = require("moment-timezone");
const logger = require("../config/logger");
const CryptoJS = require("crypto-js");

//PARA INICIAR SESION EN LA APLICACION
async function login(req, res, next) {
  const { username, password } = req.body;
  logger.info(`Login attempt for username: ${username}`);
  try {
    // Verificar si el usuario existe en la base de datos
    const user = await User.getByUsername(username);
    if (!user) {
      logger.warn(`Login failed for username: ${username} - User not found`);
      throw new ValidationError("Nombre de usuario no registrado");
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Verificar la contraseña
    const passwordMatch = await user.verifyPassword(
      hashedPassword.toUpperCase()
    );
    if (!passwordMatch) {
      logger.warn(`Login failed for username: ${username} - Invalid password`);
      throw new ValidationError("Contraseña invalida");
    }

    if (user.deleted) {
      logger.warn(
        `Login failed for username: ${username} - User does not exist`
      );
      throw new ValidationError("El usuario ha sido eliminado");
    }

    User.update(user.id, {
      first_session: true,
      lastConnection: new Date(),
      updated_at: moment().tz("America/Caracas").format("YYYY-MM-DD HH:mm:ss"),
    });

    // Obtener los tipos de validación y sus estados de validación
    const validationTypes = await ValidationType.getAll();
    const validations = await Promise.all(
      validationTypes.map(async (type) => {
        const validation = await Validation.getByUserIdAndTypeId(
          user.id,
          type.id
        );
        return {
          name: type.name,
          validated: validation ? validation.validated : false,
        };
      })
    );

    const dni = user.dniType
      ? JSON.parse(user.dniType).type + "-" + user.dni
      : null;
    const gender = user.gender ? JSON.parse(user.gender).gender : null;

    const data = {
      id: user.id,
      userGUID: user.userGUID,
      ...(user.username !== null && { username: user.username }),
      passwordExpirationDate: user.passwordExpirationDate,
      ...(user.firstName !== null && { firstName: user.firstName }),
      ...(user.lastName !== null && { lastName: user.lastName }),
      ...(user.dniType !== null && user.dni !== null && { dni: dni }),
      ...(user.birthdate !== null && { birthday: user.birthdate }),
      ...(user.gender !== null && { gender: gender }),
      email: user.email,
      ...(user.phonecode !== null && { phone: user.phonecode }),
      ...(user.phone !== null && { phone: user.phone }),
      address: user.address,
      active: user.active,
      lastConnection: user.lastConnection,
      roleId: user.roleId,
      active: user.active,
      validationTypes: validations,
    };

    // Generar un token JWT con toda la informacion sensible del usuario
    const tokenPayload = data;
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("El token", token);

    logger.info(`Login successful for username: ${username}`);
    res.status(200).json({ data: { token: token } });
  } catch (error) {
    logger.error(
      `Error during login for username: ${username} - ${error.message}`
    );
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA REGISTRARSE COMO USUARIO EN LA APLICACION
async function register(req, res, next) {
  const { email, password, passwordconfirm, businessid } = req.body;
  logger.info(`Registration attempt for email: ${email}`);
  try {
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validator.isEmail(email)) {
      logger.warn(
        `Registration failed for email: ${email} - Invalid email format`
      );
      throw new ValidationError(
        "El correo electrónico no tiene un formato válido"
      );
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      logger.warn(
        `Registration failed for email: ${email} - User already registered`
      );
      throw new ValidationError("El usuario ya está registrado");
    }

    //Para validar que las contraseñas sean iguales
    if (password != passwordconfirm) {
      logger.warn(
        `Registration failed for email: ${email} - Passwords do not match`
      );
      throw new ValidationError("Las contraseñas no coinciden");
    }

    let userGUID;
    let guidIsUnique = false;

    //PARA VALIDAR QUE EL GUID QUE SE LE ASIGNE SEA UNICO
    while (!guidIsUnique) {
      userGUID = uuidv4();
      const rows = await User.getByuserGUID(userGUID);
      if (rows == null) {
        guidIsUnique = true;
      }
    }

    let newUser;

    //SE VALIDA SI EXISTE EL BUSINESSID PORQUE SI NO HAY ES UN CLIENTE NATURAL
    if (!businessid) {
      const role = await Role.getByName("Cliente");
      if (!role) {
        throw new ValidationError("El rol Cliente no existe");
      }
      const roleID = role.id;
      newUser = await User.create({
        userGUID: userGUID,
        username: email,
        email: email,
        password: password.toUpperCase(),
        roleID: roleID,
      });
    } else {
      // SE VALIDA SI EL NEGOCIO EXISTE
      const business = await Business.getById(businessid);
      if (!business) {
        logger.warn(
          `Registration failed for email: ${email} - Business not registered`
        );
        throw new ValidationError("El negocio no se encuentra registrado.");
      }
      const firstbusinesssuer = await businesses_users.getBybusinessId(
        businessid
      );

      //SE VALIDA SI ES EL PRIMER USUARIO ASIGNADO PARA ESE NEGOCIO
      if (!firstbusinesssuer) {
        //SI ES EL PRIMERO SE BUSCA Y SE ASIGNA EL ROL ADMIN
        const role = await Role.getByName("Admin");
        if (!role) {
          throw new ValidationError("El rol administrador no existe");
        }
        const roleID = role.id;
        // Crear un nuevo usuario con rol Admin
        newUser = await User.create({
          userGUID: userGUID,
          username: email,
          email: email,
          password: password.toUpperCase(),
          roleId: roleID,
        });
        let user_business = {
          userID: newUser.id,
          business_entity_id: businessid,
        };
        //SE AGREGA EN LA RELACION DE USUARIO CON UN NEGOCIO
        await businesses_users.create(user_business);
      } else {
        //SI NO ES EL PRIMERO SE ASIGNA SIN ROL PARA QUE EL ADMINISTRADOR SE LO ASIGNE MAS TARDE
        newUser = await User.create({
          userGUID: userGUID,
          username: email,
          email: email,
          password: password.toUpperCase(),
        });
        let user_business = {
          userID: newUser.id,
          business_entity_id: businessid,
        };
        await businesses_users.create(user_business);
      }
    }

    const responsita = createAndSendRegistrationToken(userGUID, email);

    logger.info(`Registration successful for email: ${email}`);
    res.status(201).json({
      email: newUser.email,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    logger.error(
      `Error during registration for email: ${email} - ${error.message}`
    );
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA GESTIONAR LA VERIFICACIÓN DE USUARIOS
async function verifyRegisterToken(req, res, next) {
  const token = req.query.token;
  // Decodificar el token sin verificar su firma
  const decodedtoken = jwt.decode(token);

  if (!decodedtoken) {
    logger.warn("Token is not valid");
    return res.status(400).json({ status: false, message: "Token no válido." });
  }

  try {
    logger.info(`Validating Token for user GUID: ${decodedtoken.userUUID}`);

    // Intentar verificar el token y crear uno nuevo si es necesario
    const tokenCreated = await createAndSendRegistrationToken(
      decodedtoken.userUUID,
      decodedtoken.sentTo
    );

    // Responder con el estado del proceso
    if (tokenCreated) {
      return res.status(200).json({
        status: true,
        message:
          "Tiempo de completación de registro expirado. Se ha enviado un nuevo correo electrónico.",
      });
    } else {
      return res.status(200).json({
        status: false,
        message:
          "Usted posee un link de acceso vigente, por favor revise su correo electronico.",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Si el token ha expirado, generar y enviar un nuevo token
      const tokenCreated = await createAndSendRegistrationToken(
        decodedtoken.userUUID,
        decodedtoken.sentTo
      );
      if (tokenCreated) {
        return res.status(200).json({
          status: true,
          message:
            "Tiempo de completación de registro expirado. Se ha enviado un nuevo correo electrónico.",
        });
      } else {
        return res.status(200).json({
          status: false,
          message:
            "Usted posee un acceso que sigue vigente, por favor revise su correo electronico.",
        });
      }
    }
    // Manejo de otros errores
    logger.error(`Error verifying token: ${error.message}`);
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA OBTENER TODA LA LISTA DE USUARIOS
async function getallusers(req, res, next) {
  try {
    logger.info("Fetching all users");
    const allusers = await userview.getAllusers();
    res.status(200).json(allusers);
  } catch (error) {
    logger.error(`Error fetching all users - ${error.message}`);
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA OBTENER UN USUARIO POR SU GUID
async function getbyguid(req, res, next) {
  const { userGUID } = req.params;
  try {
    logger.info("Fetching user ID: ${userGUID}");
    const user = await userview.getByGuid(userGUID);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user - ${error.message}`);
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA OBTENER TODOS LOS USUARIOS DE UN NEGOCIO
async function getUsersbyBusiness(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching users for business ID: ${id}`);
    const business = await Business.getById(id);
    if (!business) {
      logger.warn(
        `Error fetching all users for business ID: ${id} - Business not found`
      );
      throw new ValidationError("El negocio no está registrado");
    }
    const usersbybusiness = await userview.getAllbyBusiness(id);
    res.status(200).json(usersbybusiness);
  } catch (error) {
    logger.error(
      `Error fetching users for business ID: ${id} - ${error.message}`
    );
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA CAMBIAR LA CONTRASEÑA DE UN USUARIO
async function changePassword(req, res, next) {
  const { id } = req.params;
  const { newpassword, newpasswordconfirm } = req.body;
  try {
    logger.info(`Password change attempt for user ID: ${id}`);
    //PRIMERO SE VALIDA SI EL USUARIO EXISTE
    const user = await User.getById(id);
    if (!user) {
      logger.warn(`Password change failed for user ID: ${id} - User not found`);
      throw new ValidationError("El usuario no está registrado");
    }

    //SE VERIFICA SI SON DIFERENTES
    if (newpassword != newpasswordconfirm) {
      logger.warn(
        `Password change failed for user ID: ${id} - Passwords does not match`
      );
      throw new ValidationError("Las contraseñas no concuerdan");
    }

    // SE VERIFICA LA CONTRASEÑA ACTUAL
    if (!user.verifyPassword(password.toUpperCase())) {
      logger.warn(
        `Password change failed for user ID: ${id} - Incorrect current password`
      );
      throw new ValidationError("Contraseña actual incorrecta");
    }

    // SE VERIFICA QUE LA CONTRASEÑA NUEVA NO PUEDE SER IGUAL A LA ANTERIOR
    if (user.verifyPassword(newpassword.toUpperCase())) {
      logger.warn(
        `Password change failed for user ID: ${id} - New password is the same as the old one`
      );
      throw new ValidationError(
        "La nueva contraseña no puede ser igual a la anterior"
      );
    }

    /*
        // SE VALIDA LA NUEVA CONTRASEÑA ACTUAL SEGUN LOS PARAMETROS ESTABLECIDOS 
        const schema = new PasswordValidator();

        schema
            .is().min(6)                                    // Longitud mínima de 6
            .is().max(10)                                   // Longitud máxima de 10
            .has().letters()                                // Debe contener letras
            .has().uppercase()                              // Debe contener al menos una letra mayúscula
            .has().digits()                                 // Debe contener al menos un número
            .has().symbols()                                // Debe contener al menos un símbolo
            .is().not().spaces();                           // No debe contener espacios

        if (!schema.validate(newpassword)) {
            logger.warn(`Password change failed for user ID: ${id} - New password does not meet requirements`);
            throw new ValidationError('La contraseña no cumple con los requisitos.');
        }*/

    const data = {
      password: newpassword.toUpperCase(),
      updated_at: moment().tz("America/Caracas").format("YYYY-MM-DD HH:mm:ss"),
    };
    await User.update(user.id, data);
    logger.info(`Password changed successfully for user ID: ${id}`);
    res.status(200).json({ message: "Clave cambiada exitosamente" });
  } catch (error) {
    logger.error(
      `Error during password change for user ID: ${id} - ${error.message}`
    );
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA ACTUALIZAR UN USUARIO ESPECIFICO
async function updateUser(req, res, next) {
  const { id } = req.params;
  const userupdated = req.body;

  try {
    logger.info(`Update attempt for user ID: ${id}`);
    console.log(id);
    // Verificar si el usuario existe en la base de datos
    const user = await User.getById(id);
    if (!user) {
      logger.warn(`Update failed for user ID: ${id} - User not found`);
      throw new ValidationError("Credenciales inválidas");
    }
    userupdated.updated_at = moment()
      .tz("America/Caracas")
      .format("YYYY-MM-DD HH:mm:ss");
    await User.update(id, userupdated);
    logger.info(`User updated successfully for user ID: ${id}`);
    res.status(200).json({ message: "Datos actualizados exitosamente" });
  } catch (error) {
    logger.error(`Error during update for user ID: ${id} - ${error.message}`);
    next(error); // Pasar el error al middleware de manejo de errores
  }
}

//PARA CAMBIAR EL NOMBRE DE USUARIO
async function changeUsername(req, res, next) {
  const { id } = req.params;
  const { username, newUsername } = req.body;
  try {
    logger.info(`Username change attempt for user ID: ${id}`);
    // Verificar si el usuario existe en la base de datos
    const user = await User.getByUsername(username);
    if (!user) {
      logger.warn(
        `Username change failed for user ID: ${id} - Username not found`
      );
      throw new ValidationError(
        "El nombre de usuario no se encuentra registrado"
      );
    }

    // Para validar el username según los parámetros establecidos
    const schema = new PasswordValidator();

    schema
      .is()
      .min(3) // Longitud mínima de 3
      .is()
      .max(12) // Longitud máxima de 12
      .is()
      .not()
      .spaces(); // No debe contener espacios

    if (!schema.validate(newUsername)) {
      logger.warn(
        `Username change failed for user ID: ${id} - New username does not meet requirements`
      );
      throw new ValidationError(
        "El nuevo nombre de usuario no cumple con los requisitos."
      );
    }

    if (username === newUsername) {
      logger.warn(
        `Username change failed for user ID: ${id} - New username is the same as the old one`
      );
      throw new ValidationError(
        "El nombre de usuario nuevo no puede ser igual al anterior"
      );
    }

    const usernew = await User.getByUsername(newUsername);
    if (usernew) {
      logger.warn(
        `Username change failed for user ID: ${id} - New username not available`
      );
      throw new ValidationError(
        "El nombre de usuario no se encuentra disponible"
      );
    }

    const data = {
      username: newUsername,
      updated_at: moment().tz("America/Caracas").format("YYYY-MM-DD HH:mm:ss"),
    };
    await User.update(id, data);
    logger.info(`Username updated successfully for user ID: ${id}`);
    res.status(200).json({ message: "Username actualizado exitosamente" });
  } catch (error) {
    logger.error(
      `Error during username change for user ID: ${id} - ${error.message}`
    );
    next(error);
  }
}

module.exports = {
  register,
  verifyRegisterToken,
  getallusers,
  getbyguid,
  login,
  getUsersbyBusiness,
  updateUser,
  changePassword,
  changeUsername,
};
