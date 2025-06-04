const ContactPerson = require('../models/ContactPerson');
const { ValidationError } = require('../middleware/errorhandler');
const logger = require('../config/logger');
const moment = require('moment-timezone');

    // Obtener todos los contactos
    async function getAll(req, res, next) {
        try {
            logger.info('Fetching all contacts');
            const contacts = await ContactPerson.getAll();
            logger.info('Se obtuvieron todos los contactos');
            return res.status(200).json(contacts);
        } catch (error) {
            logger.error(`Error al obtener los contactos - ${error.message}`);
            next(error);
        }
    }

    // Obtener contacto por ID
    async function getById(req, res, next) {
        const { id } = req.params;
        try {
            logger.info(`Fetching contact with ID: ${id}`);
            const contact = await ContactPerson.getById(id);
            if (!contact) {
                throw new ValidationError('La persona de contacto no existe'); // Manejo de error
            }
            logger.info(`Se obtuvo la persona de contacto con ID: ${id}`);
            return res.status(200).json(contact);
        } catch (error) {
            logger.error('Error al obtener la persona de contacto: ', error);
            next(error);
        }
    }

    // Obtener contacto por negocio
    async function getByBusiness(req, res, next) {
        const { id } = req.params;
        try {
            logger.info(`Fetching contact for business ID: ${id}`);
            const contact = await ContactPerson.getContactPerson(id);
            if (!contact) {
                throw new ValidationError('La persona de contacto no existe para ese negocio'); // Manejo de error
            }
            logger.info(`Se obtuvo la persona de contacto con ID: ${id}`);
            return res.status(200).json(contact);
        } catch (error) {
            logger.error('Error al obtener la persona de contacto: ', error);
            next(error);
        }
    }

    // Crear un nuevo contacto
    async function create(req, res, next) {
        const data = req.body;
        try {
            logger.info('Attempting to create a new contact person');
            const newContact = await ContactPerson.create(data);
            logger.info('Se creó una nueva persona de contacto');
            return res.status(201).json(newContact);
        } catch (error) {
            logger.error('Error al crear la persona de contacto: ', error);
            next(error);
        }
    }

    // Actualizar un contacto por ID
    async function update(req, res, next) {
        const { id } = req.params;
        const data = req.body;
        try {
            const existingContact = await ContactPerson.getById(id);
            if (!existingContact) {
                throw new ValidationError('La persona de contacto no existe'); // Manejo de error
            }
            const updatedContact = await ContactPerson.update(id, data);
            logger.info(`Se actualizó la persona de contacto con ID: ${id}`);
            return res.status(200).json(updatedContact);
        } catch (error) {
            logger.error('Error al actualizar la persona de contacto: ', error);
            next(error);
        }
    }

    // Eliminar un contacto por ID
    async function deleteContact(req, res, next) {
        const { id } = req.params;
        try {
            const deleted = await ContactPerson.delete(id);
            if (deleted === 0) {
                throw new ValidationError('La persona de contacto no existe'); // Manejo de error
            }
            logger.info(`Se eliminó la persona de contacto con ID: ${id}`);
            return res.status(204).json(); // No content
        } catch (error) {
            logger.error('Error al eliminar la persona de contacto: ', error);
            next(error);
        }
    }


module.exports = {
    getAll,
    getByBusiness,
    getById,
    create,
    update,
    deleteContact,
};
