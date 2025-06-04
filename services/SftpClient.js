const Client = require("ssh2-sftp-client");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");
const fs = require("fs");
const path = require("path");

// Crear una nueva instancia del cliente SFTP
const sftp = new Client();

// Conectar al servidor SFTP
async function connectToSFTP(req, res, next) {
  const { SERVER: server, USER: user, PASSWORD: password } = process.env;
  try {
    logger.info("Attempting to connect to SFTP server");
    await sftp.connect({
      host: server,
      port: 22,
      username: user,
      password: password,
    });
    logger.info("Connected to SFTP server successfully");
    next();
  } catch (error) {
    logger.error(`Error connecting to SFTP server - ${error.message}`);
    next(error);
  }
}

// Desconectar del servidor SFTP
async function disconnectFromSFTP(req, res, next) {
  try {
    logger.info("Attempting to disconnect from SFTP server");
    await sftp.end();
    logger.info("Disconnected from SFTP server successfully");
  } catch (error) {
    logger.error(`Error disconnecting from SFTP server - ${error.message}`);
    next(error);
  }
}

// Enviar un archivo al servidor SFTP
async function sendFileToSFTP(req, res, next) {
  const { REMOTE_DIRECTORY } = process.env;

  try {
    // Validar que REMOTE_DIRECTORY esté definido
    if (!REMOTE_DIRECTORY) {
      throw new Error("La ruta REMOTE_DIRECTORY no está definida.");
    }

    // Validar que el archivo fue procesado por multer
    if (!req.file) {
      throw new Error("No se recibió ningún archivo en la solicitud.");
    }
    const { originalname, path: localFilePath } = req.file; // Archivo procesado por multer

    // Asegurar que REMOTE_DIRECTORY termine con "/"
    const normalizedRemoteDirectory = REMOTE_DIRECTORY.endsWith("/")
      ? REMOTE_DIRECTORY
      : REMOTE_DIRECTORY + "/";

    // Construir ruta remota completa
    const remoteFilePath = path.posix.join(
      normalizedRemoteDirectory,
      originalname
    );

    // Validar que el archivo existe en la ruta local (temporal)
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`El archivo local ${localFilePath} no existe.`);
    }

    // Enviar el archivo al servidor SFTP
    logger.info(
      `Enviando archivo desde ${localFilePath} hacia ${remoteFilePath}`
    );
    await sftp.put(localFilePath, remoteFilePath);
    logger.info("Archivo enviado al servidor SFTP exitosamente");

    // Enviar respuesta exitosa
    res.status(200).json({
      message: "Archivo enviado con éxito",
      remotePath: remoteFilePath,
    });

    // Eliminar el archivo temporal
    fs.unlinkSync(localFilePath);
    next();
  } catch (error) {
    logger.error(`Error al enviar archivo al servidor SFTP: ${error.message}`);
    next(error);
  }
}

// Obtener un archivo del servidor SFTP
async function getFileFromSFTP(req, res, next) {
  const { remotePath, localPath } = req.body;
  try {
    logger.info(
      `Attempting to retrieve file from ${remotePath} to ${localPath}`
    );
    await sftp.get(remotePath, localPath);
    logger.info("File retrieved from SFTP server successfully");
    res.status(200).json({ message: "Archivo obtenido por SFTP con éxito" });
  } catch (error) {
    logger.error(`Error retrieving file from SFTP server - ${error.message}`);
    next(error);
  }
}

module.exports = {
  connectToSFTP,
  disconnectFromSFTP,
  sendFileToSFTP,
  getFileFromSFTP,
};

/*const Client = require("ssh2-sftp-client");

class SFTPClient {
  constructor() {
    this.sftp = new Client();
  }

  async connect(parameters) {
    try {
      await this.sftp.connect({
        host: parameters.server,
        port: 22,
        username: parameters.user,
        password: parameters.password,
      });
      console.log("Conectado al servidor SFTP");
    } catch (error) {
      console.error("Error al conectar al servidor SFTP:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.sftp.end();
      console.log("Desconectado del servidor SFTP");
    } catch (error) {
      console.error("Error al desconectar del servidor SFTP:", error);
      throw error;
    }
  }

  async sendFile(localPath, remotePath) {
    try {
      await this.sftp.put(localPath, remotePath);
      console.log("Archivo enviado por SFTP con éxito");
    } catch (error) {
      console.error("Error al enviar archivo por SFTP:", error);
      throw error;
    }
  }

  async getFile(remotePath, localPath) {
    try {
      await this.sftp.get(remotePath, localPath);
      console.log("Archivo obtenido por SFTP con éxito");
    } catch (error) {
      console.error("Error al obtener archivo por SFTP:", error);
      throw error;
    }
  }
}

module.exports = SFTPClient;*/
