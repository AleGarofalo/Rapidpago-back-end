const {json} = require('express')
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const PasswordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../middleware/errorhandler');
const User = require('../models/User');
const userview = require('../models/Userview');
const Role = require('../models/Role');
const Business = require ('../models/Business');
const BusinessCategory = require ('../models/BusinessCategory');
const PointsaleCategory = require ('../models/PointsaleCategory');
const Businessview = require ('../models/Businessview');
const PointSale = require ('../models/PointSale');
const PointsaleCategoryview = require ('../models/PointsaleCategoryview');
const businesses_users = require('../models/Businesses_users');
const moment = require('moment-timezone');
const { format } = require('date-fns');
const logger = require('../config/logger');


async function create(req, res, next) {
    try {
        const { name, description, pos_details, association_date, point_sale_category_id, business_id } = req.body;

        logger.info(`Attempting to create Point of Sale with name: ${name}`);

        const business = await PointSale.getById(business_id);
        if (!business) {
            logger.warn(`Business not found: ${business_id}`);
            throw new ValidationError('El negocio asociado no existe.');
        }
        const category = await PointsaleCategory.getById(point_sale_category_id);
        if (!category) {
            logger.warn(`Category not found: ${point_sale_category_id}`);
            throw new ValidationError('La categoria asociada no existe.');
        }

        let posGUID;
        let guidIsUnique = false;

        while (!guidIsUnique) {
            posGUID = uuidv4();
            const rows = await PointSale.getByGUID(posGUID);
            if (rows == null) {
                guidIsUnique = true;
            }
        }

        const pos = await PointSale.create({
            pos_GUID: posGUID,
            name: name,
            description: description,
            pos_details: pos_details,
            association_date: association_date,
            point_sale_category_id: point_sale_category_id,
            business_id: business_id
        });

        logger.info(`Point of Sale created successfully: ${pos.name}`);
        res.status(200).json({ POS: pos.name, message: 'Usuario registrado correctamente' });
    } catch (error) {
        logger.error(`Error creating Point of Sale: ${error}`);
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        logger.info(`Attempting to update Point of Sale with ID: ${id}`);
        const pos = await PointSale.getById(id);
        if(!pos){
            logger.warn(`POS does not exist: ${name}`);
            return res.status(400).json({ message: 'El pos no existe' });
        }
        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        await PointSale.update(id, data);
        logger.info(`Point of Sale updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating Point of Sale with ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallPOS(req, res, next) {
    try {
        logger.info('Fetching all Points of Sale');

        const pos = await PointSale.getAll();
        res.status(200).json(pos);

        logger.info('Points of Sale fetched successfully');
    } catch (error) {
        logger.error('Error fetching Points of Sale:', error);
        next(error);
    }
}

async function getPOSByBusiness(req, res, next) {
    try {
        const { id } = req.params;
        
        logger.info(`Fetching Points of Sale for Business ID: ${id}`);

        const posbybusiness = await PointSale.getByBusiness(id);
        res.status(200).json(posbybusiness);

        logger.info(`Points of Sale for Business ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Points of Sale for Business ID: ${id}, ${error}`);
        next(error);
    }
}

async function getPOSBycategory(req, res, next) {
    try {
        const { id } = req.params;

        logger.info(`Fetching Points of Sale for Category ID: ${id}`);

        const posbycategory = await PointSale.getByCategory(id);
        res.status(200).json(posbycategory);

        logger.info(`Points of Sale for Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Points of Sale for Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallposcategories(req, res, next) {
    try {
        logger.info('Fetching all POS categories');

        const categories = await PointsaleCategory.getAll();
        res.status(200).json(categories);

        logger.info('POS categories fetched successfully');
    } catch (error) {
        logger.error('Error fetching POS categories:', error);
        next(error);
    }
}

async function getallactiveposcategories(req, res, next) {
    try {
        logger.info('Fetching all active POS categories');

        const categories = await PointsaleCategory.getAllActive();
        res.status(200).json(categories);

        logger.info('POS categories fetched successfully');
    } catch (error) {
        logger.error('Error fetching POS categories:', error);
        next(error);
    }
}

async function getPOSCategory(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching POS Category ID: ${id}`);
        const category = await PointsaleCategory.getById(id);
        res.status(200).json(category);
        logger.info(`POS Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching POS Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;

        logger.info(`Attempting to update POS category with ID: ${id}`);

        const category = await PointsaleCategory.getById(id);
        if (!category) {
            logger.warn(`Category not found: ${id}`);
            throw new ValidationError('La categoria no se encuentra registrada');
        }
        data.updated_at = new Date();
        await PointsaleCategory.update(id, data);

        logger.info(`POS category updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating POS category with ID: ${id}, ${error}`);
        next(error);
    }
}

async function registerCategory(req, res, next) {
    try {
        const data = req.body;

        logger.info(`Attempting to register POS category with name: ${data.code_name}`);

        const category = await PointsaleCategory.getByName(data.code_name.trim());
        if (category) {
            logger.warn(`Category already exists: ${data.code_name}`);
            throw new ValidationError('La categoria ya se encuentra registrada');
        }

        await PointsaleCategory.create(data);

        logger.info(`POS category registered successfully: ${data.code_name}`);
        res.status(200).json({ category: data.code_name, message: 'Business category registrada correctamente' });
    } catch (error) {
        logger.error(`Error registering POS category: ${data.code_name}, ${error}`);
        next(error);
    }
}


module.exports = {create,getallPOS,update,getPOSByBusiness,getPOSBycategory,getallposcategories,getallactiveposcategories,getPOSCategory,updateCategory,registerCategory};