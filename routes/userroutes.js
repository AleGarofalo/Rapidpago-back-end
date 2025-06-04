const express = require("express");
const router = express.Router();
const { json } = require("express");
const pool = require("../database");
const {
  register,
  verifyRegisterToken,
  getallusers,
  getbyguid,
  login,
  getUsersbyBusiness,
  updateUser,
  changePassword,
  changeUsername,
} = require("../controllers/usercontroller");

// Ruta para obtener la lista de todos los usuarios
router.get("/getallusers", getallusers);

// Ruta para obtener la lista de todos los usuarios
router.get("/getbyguid/:userGUID", getbyguid);

// Ruta para obtener la lista de todos los usuarios asociados a un negocio
router.get("/getusersbybusiness/:id", getUsersbyBusiness);

// Ruta para veririfar expiracion de creacion de usuario
router.get("/verify-registration", verifyRegisterToken);

// Ruta para manejar el registro de usuarios
router.post("/register", register);

// Ruta para hacer login a la aplicacion
router.post("/login", login);

// Ruta para actualizar los datos de un usuario
router.patch("/update/:id", updateUser);

// Ruta para cambiar la contraseña de un usuario
router.patch("/changepassword/:id", changePassword);

// Ruta para cambiar la contraseña de un usuario
router.patch("/changeusername/:id", changeUsername);

module.exports = router;
