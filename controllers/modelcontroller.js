const Model = require('../models/Model');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los modelos
async function getAllModels(req, res, next) {
    try {
        logger.info('Fetching all models');
        const models = await Model.getAll();
        res.status(200).json(models);
    } catch (error) {
        logger.error(`Error fetching all models - ${error.message}`);
        next(error);
    }
}

// Obtener todos los modelos activos
async function getAllActiveModels(req, res, next) {
    try {
        logger.info('Fetching all active models');
        const models = await Model.getAllActive();
        res.status(200).json(models);
    } catch (error) {
        logger.error(`Error fetching all active models - ${error.message}`);
        next(error);
    }
}

// Obtener un modelo por ID
async function getModelById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching model with ID: ${id}`);
        const model = await Model.getById(id);
        if (!model) {
            throw new ValidationError('El modelo no existe');
        }
        res.status(200).json(model);
    } catch (error) {
        logger.error(`Error fetching model by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo modelo
async function createModel(req, res, next) {
    const { name, brand, userID } = req.body;
    try {
        logger.info(`Attempting to create model: ${name}`);

        // Verificar si el modelo ya existe por nombre
        const existingModel = await Model.getByName(name);
        if (existingModel) {
            throw new ValidationError('El modelo ya se encuentra registrado');
        }

        // Insertar el nuevo modelo en la base de datos
        const newModel = await Model.create({ name, brand, userID });

        logger.info(`Model created successfully: ${name}`);
        res.status(201).json({
            message: 'Modelo creado correctamente',
            data: newModel,
        });
    } catch (error) {
        logger.error(`Error creating model - ${error.message}`);
        next(error);
    }
}

// Actualizar un modelo por ID
async function updateModel(req, res, next) {
    const { id } = req.params;
    const updatedModel = req.body;
    try {
        logger.info(`Attempting to update model with ID: ${id}`);

        // Verificar si el modelo existe
        const existingModel = await Model.getById(id);
        if (!existingModel) {
            throw new ValidationError('El modelo no existe');
        }

        // Actualizar el timestamp
        updatedModel.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el modelo en la base de datos
        const model = await Model.update(id, updatedModel);
        logger.info(`Model updated successfully: ${id}`);
        res.status(200).json({
            message: 'Modelo actualizado correctamente',
            data: model,
        });
    } catch (error) {
        logger.error(`Error updating model with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un modelo por ID
async function deleteModel(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete model with ID: ${id}`);

        // Verificar si el modelo existe antes de eliminar
        const existingModel = await Model.getById(id);
        if (!existingModel) {
            throw new ValidationError('El modelo no existe');
        }

        // Eliminar el modelo de la base de datos
        await Model.delete(id);
        logger.info(`Model deleted successfully: ${id}`);
        res.status(200).json({ message: 'Modelo eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting model with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllModels,
    getAllActiveModels,
    getModelById,
    createModel,
    updateModel,
    deleteModel,
};
