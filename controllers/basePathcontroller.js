const BasePath = require("../models/BasePath");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener la ruta base activa
async function getActiveBasePath(req, res, next) {
  try {
    logger.info("Fetching active base path");
    const basePath = await BasePath.getActive();

    if (!basePath) {
      throw new ValidationError("No hay una ruta base activa registrada");
    }

    res.status(200).json(basePath);
    logger.info("Active base path fetched successfully");
  } catch (error) {
    logger.error("Error fetching active base path:", error);
    next(error);
  }
}

// Obtener todas las rutas base
async function getAllBasePaths(req, res, next) {
  try {
    logger.info("Fetching all base paths");
    const basePaths = await BasePath.getAll();

    res.status(200).json(basePaths);
    logger.info("All base paths fetched successfully");
  } catch (error) {
    logger.error("Error fetching all base paths:", error);
    next(error);
  }
}

// Registrar una nueva ruta base
async function registerBasePath(req, res, next) {
  const data = req.body;

  try {
    logger.info(`Attempting to register base path: ${data.ruta_base}`);

    // Validar que la ruta base no exista previamente
    const existingBasePath = await BasePath.getAll();
    if (existingBasePath.some((path) => path.ruta_base === data.ruta_base)) {
      logger.warn(`Base path already exists: ${data.ruta_base}`);
      throw new ValidationError("La ruta base ya se encuentra registrada");
    }

    const newBasePath = await BasePath.create(data);

    res
      .status(200)
      .json({
        message: "Ruta base registrada correctamente",
        basePath: newBasePath,
      });
    logger.info(`Base path registered successfully: ${data.ruta_base}`);
  } catch (error) {
    logger.error(`Error registering base path: ${error}`);
    next(error);
  }
}

// Actualizar una ruta base
async function updateBasePath(req, res, next) {
  const { id } = req.params;
  const data = req.body;

  try {
    logger.info(`Attempting to update base path with ID: ${id}`);

    const existingBasePath = await BasePath.getById(id);
    if (!existingBasePath) {
      logger.warn(`Base path not found: ${id}`);
      throw new ValidationError("La ruta base no se encuentra registrada");
    }

    const updatedBasePath = await BasePath.update(id, data);

    res
      .status(200)
      .json({
        message: "Ruta base actualizada correctamente",
        basePath: updatedBasePath,
      });
    logger.info(`Base path updated successfully: ${id}`);
  } catch (error) {
    logger.error(`Error updating base path with ID: ${id}, ${error}`);
    next(error);
  }
}

// Eliminar una ruta base
async function deleteBasePath(req, res, next) {
  const { id } = req.params;

  try {
    logger.info(`Attempting to delete base path with ID: ${id}`);

    const existingBasePath = await BasePath.getById(id);
    if (!existingBasePath) {
      logger.warn(`Base path not found: ${id}`);
      throw new ValidationError("La ruta base no se encuentra registrada");
    }

    await BasePath.delete(id);

    res.status(200).json({ message: "Ruta base eliminada correctamente" });
    logger.info(`Base path deleted successfully: ${id}`);
  } catch (error) {
    logger.error(`Error deleting base path with ID: ${id}, ${error}`);
    next(error);
  }
}

module.exports = {
  getActiveBasePath,
  getAllBasePaths,
  registerBasePath,
  updateBasePath,
  deleteBasePath,
};
