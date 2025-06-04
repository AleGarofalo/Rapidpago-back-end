const Attachment = require("../models/Attachment");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener todos los archivos
async function getAllAttachments(req, res, next) {
  try {
    logger.info("Fetching all attachments");
    const attachments = await Attachment.getAll();

    res.status(200).json(attachments);
    logger.info("Attachments fetched successfully");
  } catch (error) {
    logger.error("Error fetching attachments:", error);
    next(error);
  }
}

// Obtener un archivo por ID
async function getAttachmentById(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching attachment with ID: ${id}`);
    const attachment = await Attachment.getById(id);

    if (!attachment) {
      logger.warn(`Attachment not found: ${id}`);
      throw new ValidationError("El archivo no se encuentra registrado");
    }

    res.status(200).json(attachment);
    logger.info(`Attachment with ID: ${id} fetched successfully`);
  } catch (error) {
    logger.error(`Error fetching attachment with ID: ${id}, ${error}`);
    next(error);
  }
}

// Registrar un nuevo archivo
async function registerAttachment(req, res, next) {
  const data = req.body;

  try {
    logger.info(`Attempting to register attachment: ${data.filename}`);

    // Validar campos obligatorios
    if (!data.filename || !data.path) {
      throw new ValidationError(
        "El nombre del archivo y la ruta son obligatorios"
      );
    }

    const newAttachment = await Attachment.create(data);

    res
      .status(200)
      .json({
        message: "Archivo registrado correctamente",
        attachment: newAttachment,
      });
    logger.info(`Attachment registered successfully: ${data.filename}`);
  } catch (error) {
    logger.error(`Error registering attachment: ${error}`);
    next(error);
  }
}

// Actualizar un archivo por ID
async function updateAttachment(req, res, next) {
  const { id } = req.params;
  const data = req.body;

  try {
    logger.info(`Attempting to update attachment with ID: ${id}`);

    const attachment = await Attachment.getById(id);
    if (!attachment) {
      logger.warn(`Attachment not found: ${id}`);
      throw new ValidationError("El archivo no se encuentra registrado");
    }

    const updatedAttachment = await Attachment.update(id, data);

    res
      .status(200)
      .json({
        message: "Archivo actualizado correctamente",
        attachment: updatedAttachment,
      });
    logger.info(`Attachment updated successfully: ${id}`);
  } catch (error) {
    logger.error(`Error updating attachment with ID: ${id}, ${error}`);
    next(error);
  }
}

// Eliminar un archivo por ID
async function deleteAttachment(req, res, next) {
  const { id } = req.params;

  try {
    logger.info(`Attempting to delete attachment with ID: ${id}`);

    const attachment = await Attachment.getById(id);
    if (!attachment) {
      logger.warn(`Attachment not found: ${id}`);
      throw new ValidationError("El archivo no se encuentra registrado");
    }

    await Attachment.knex("attachments").where("id", id).del();

    res.status(200).json({ message: "Archivo eliminado correctamente" });
    logger.info(`Attachment deleted successfully: ${id}`);
  } catch (error) {
    logger.error(`Error deleting attachment with ID: ${id}, ${error}`);
    next(error);
  }
}

module.exports = {
  getAllAttachments,
  getAttachmentById,
  registerAttachment,
  updateAttachment,
  deleteAttachment,
};
