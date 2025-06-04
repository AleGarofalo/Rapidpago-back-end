const Motive = require('../models/Motive');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los motivos
async function getAllMotives(req, res, next) {
    try {
        logger.info('Fetching all motives');
        const motives = await Motive.getAll();
        res.status(200).json(motives);
    } catch (error) {
        logger.error(`Error fetching all motives - ${error.message}`);
        next(error);
    }
}

// Obtener todos los motivos activos
async function getAllActiveMotives(req, res, next) {
    try {
        logger.info('Fetching all active motives');
        const motives = await Motive.getAllActive();
        res.status(200).json(motives);
    } catch (error) {
        logger.error(`Error fetching all active motives - ${error.message}`);
        next(error);
    }
}

// Obtener un motivo por ID
async function getMotiveById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching motive ID: ${id}`);
        const motive = await Motive.getById(id);
        if (!motive) {
            throw new ValidationError('El motivo no existe');
        }
        res.status(200).json(motive);
    } catch (error) {
        logger.error(`Error fetching motive by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo motivo
async function createMotive(req, res, next) {
    const { description, userID } = req.body;
    try {
        logger.info(`Attempting to create motive: ${description}`);

        // Verificar si el motivo ya existe por descripción
        const existingMotive = await Motive.getByDescription(description);
        if (existingMotive) {
            throw new ValidationError('El motivo ya se encuentra registrado');
        }

        // Insertar el nuevo motivo en la base de datos
        const newMotive = await Motive.create({ description, userID });

        logger.info(`Motive created successfully: ${description}`);
        res.status(201).json({
            message: 'Motivo creado correctamente',
            data: newMotive,
        });
    } catch (error) {
        logger.error(`Error creating motive - ${error.message}`);
        next(error);
    }
}

// Actualizar un motivo por ID
async function updateMotive(req, res, next) {
    const { id } = req.params;
    const updatedMotive = req.body;
    try {
        logger.info(`Attempting to update motive with ID: ${id}`);

        // Verificar si el motivo existe
        const existingMotive = await Motive.getById(id);
        if (!existingMotive) {
            throw new ValidationError('El motivo no existe');
        }

        // Actualizar el timestamp
        updatedMotive.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el motivo en la base de datos
        const motive = await Motive.update(id, updatedMotive);
        logger.info(`Motive updated successfully: ${id}`);
        res.status(200).json({
            message: 'Motivo actualizado correctamente',
            data: motive,
        });
    } catch (error) {
        logger.error(`Error updating motive with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un motivo por ID
async function deleteMotive(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete motive with ID: ${id}`);

        // Verificar si el motivo existe antes de eliminar
        const existingMotive = await Motive.getById(id);
        if (!existingMotive) {
            throw new ValidationError('El motivo no existe');
        }

        // Eliminar el motivo de la base de datos
        await Motive.delete(id);
        logger.info(`Motive deleted successfully: ${id}`);
        res.status(200).json({ message: 'Motivo eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting motive with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllMotives,
    getAllActiveMotives,
    getMotiveById,
    createMotive,
    updateMotive,
    deleteMotive,
};
