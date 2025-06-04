const Item = require('../models/Item');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

// Obtener todos los ítems
async function getAllItems(req, res, next) {
    try {
        logger.info('Fetching all items');
        const items = await Item.getAll();
        res.status(200).json(items);
    } catch (error) {
        logger.error(`Error fetching all items - ${error.message}`);
        next(error);
    }
}

// Obtener un ítem por ID
async function getItemById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching item with ID: ${id}`);
        const item = await Item.getById(id);
        if (!item) {
            throw new ValidationError('El ítem no existe');
        }
        res.status(200).json(item);
    } catch (error) {
        logger.error(`Error fetching item by ID - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo ítem
async function createItem(req, res, next) {
    const { serial, userID, modelID } = req.body;
    try {
        logger.info('Attempting to create a new item');

        // Insertar el nuevo ítem en la base de datos
        const newItem = await Item.create({
            serial,
            userID,
            modelID,
            created_at: moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss'),
        });

        logger.info('Item created successfully');
        res.status(201).json({
            message: 'Ítem creado correctamente',
            data: newItem,
        });
    } catch (error) {
        logger.error(`Error creating item - ${error.message}`);
        next(error);
    }
}

// Actualizar un ítem por ID
async function updateItem(req, res, next) {
    const { id } = req.params;
    const updatedItem = req.body;
    try {
        logger.info(`Attempting to update item with ID: ${id}`);

        // Verificar si el ítem existe
        const existingItem = await Item.getById(id);
        if (!existingItem) {
            throw new ValidationError('El ítem no existe');
        }

        // Actualizar el timestamp
        updatedItem.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el ítem en la base de datos
        const item = await Item.update(id, updatedItem);
        logger.info(`Item updated successfully: ${id}`);
        res.status(200).json({
            message: 'Ítem actualizado correctamente',
            data: item,
        });
    } catch (error) {
        logger.error(`Error updating item with ID: ${id} - ${error.message}`);
        next(error);
    }
}

// Eliminar un ítem por ID
async function deleteItem(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Attempting to delete item with ID: ${id}`);

        // Verificar si el ítem existe antes de eliminar
        const existingItem = await Item.getById(id);
        if (!existingItem) {
            throw new ValidationError('El ítem no existe');
        }

        // Eliminar el ítem de la base de datos
        await Item.delete(id);
        logger.info(`Item deleted successfully: ${id}`);
        res.status(200).json({ message: 'Ítem eliminado correctamente' });
    } catch (error) {
        logger.error(`Error deleting item with ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};
