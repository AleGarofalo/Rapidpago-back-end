const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userview = require("../models/Userview");
const { sendEmail } = require("../services/Email");
const { ValidationError } = require("../middleware/errorhandler");
const Userview = require("../models/Userview");
const moment = require("moment-timezone");

const secret = process.env.JWT_SECRET || "your_jwt_secret";

async function createAndSendRegistrationToken(userGUID, email) {
  try {
    const user = await Userview.getByGuid(userGUID);
    if (user.token) {
      const decodedtoken = jwt.decode(user.token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedtoken.exp > currentTime) return false;
    }
    // Crear el token firmado con el userGUID y una expiración de 24 horas
    const token = jwt.sign({ userUUID: userGUID, sentTo: email }, secret, {
      expiresIn: "24h",
    });
    //Actualizo el usuario con el nuevo token creado
    User.update(user.id, {
      token: token,
      updated_at: moment().tz("America/Caracas").format("YYYY-MM-DD HH:mm:ss"),
    });
    // Crear el enlace de registro con el token
    const registrationLink = `http://localhost:5173/auth/boxed-signup-complete?token=${token}`;
    // Enviar el correo con el enlace de registro
    await sendEmail(email, registrationLink);
    return true;
  } catch (error) {
    console.error("Error al crear y enviar el token de registro:", error);
  }
}

module.exports = { createAndSendRegistrationToken };
