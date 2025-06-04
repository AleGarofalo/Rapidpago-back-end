const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  connectToSFTP,
  disconnectFromSFTP,
  sendFileToSFTP,
  getFileFromSFTP,
} = require("../services/SftpClient");

// Configurar Multer para manejar archivos subidos
const upload = multer({ dest: "uploads/" }); // Archivos temporales se guardarán en "uploads/"

// Ruta para enviar un archivo al servidor SFTP
router.post(
  "/send-file",
  upload.single("file"), // Procesar el archivo enviado con el campo "file"
  connectToSFTP, // Conectar al servidor SFTP
  sendFileToSFTP, // Subir el archivo al servidor SFTP
  disconnectFromSFTP // Desconectar del servidor SFTP
);

// Ruta para obtener un archivo del servidor SFTP
router.post(
  "/get-file",
  connectToSFTP, // Conectar al servidor SFTP
  getFileFromSFTP, // Obtener el archivo del servidor SFTP
  disconnectFromSFTP // Desconectar del servidor SFTP
);

module.exports = router;
