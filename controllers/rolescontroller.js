const Role = require('../models/Role');
const logger = require('../config/logger');
const moment = require('moment-timezone');

async function createRole(req, res) {
    const { name } = req.body;
    try {
        logger.info(`Attempting to create role with name: ${name}`);

        // Verificar si el rol ya existe en la base de datos
        const existingRole = await Role.getByName(name);
        if (existingRole) {
            logger.warn(`Role already exists: ${name}`);
            return res.status(400).json({ message: 'El rol ya existe' });
        }

        // Insertar el nuevo rol en la base de datos
        await Role.create({ name });

        logger.info(`Role created successfully: ${name}`);
        res.status(201).json({ message: 'Rol creado correctamente' });
    } catch (error) {
        logger.error(`Error creating role: ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function updateRole(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
        logger.info(`Attempting to update role with ID: ${id}`);
        const existingRole = await Role.getById(id);
        if (!existingRole) {
            logger.warn(`Role does not exist: ${name}`);
            return res.status(400).json({ message: 'El rol no existe' });
        }
        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        // Actualizar el rol en la base de datos
        await Role.update(id,data);
        logger.info(`Role updated successfully: ${id}`);
        res.json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        logger.error(`Error updating role with ID: ${id}, ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function listRoles(req, res) {
    try {
        logger.info('Fetching all roles');

        // Obtener todos los roles de la base de datos
        const roles = await Role.getAll();
        res.json(roles);

        logger.info('Roles fetched successfully');
    } catch (error) {
        logger.error(`Error fetching roles: ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

//PARA OBTENER UN USUARIO POR SU GUID
async function getbyid(req, res, next) {
    const {id} = req.params
    try {
        logger.info('Fetching role ID: ${id}');
        const role = await Role.getById(id);
        res.status(200).json(role);
    } catch (error) {
        logger.error(`Error fetching role - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

module.exports = { createRole, listRoles, updateRole,getbyid};