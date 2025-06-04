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
const Bankaccount = require('../models/Bankaccount')
const Business = require ('../models/Business');
const BusinessCategory = require ('../models/BusinessCategory');
const BusinessCategoryview = require ('../models/BusinessCategoryview');
const Businessview = require ('../models/Businessview');
const businesses_users = require('../models/Businesses_users');
const { format } = require('date-fns');
const logger = require('../config/logger');

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

//PARA REGISTRAR NEGOCIOS
async function register(req, res, next) {
    try {
        const data = req.body;

        logger.info(`Attempting to register Business with legal name: ${data.legalName}`);

        if(data.businessParentId){
            const parent = await Business.getById(data.businessParentId);
            if (!parent) {
                logger.warn(`Parent business not found: ${data.businessParentId}`);
                throw new ValidationError('El negocio al que pertenece no se encuentra registrado');
            }
        }

        const legalname = await Business.getByLegalName(data.legalName.trim());
        if (legalname) {
            logger.warn(`Legal name already taken: ${data.legalName}`);
            throw new ValidationError('El nombre del negocio no se encuentra disponible');
        }

        if(data.businessCategoryId){
            const category = await BusinessCategory.getById(data.businessCategoryId);
            if (!category) {
                logger.warn(`Category not found: ${data.businessCategoryId}`);
                throw new ValidationError('La categoria no se encuentra registrada');
            }
        }

        let businessGUID;
        let guidIsUnique = false;

        while (!guidIsUnique) {
            businessGUID = uuidv4();
            const rows = await Business.getByBusinessGUID(businessGUID);
            if (rows == null) {
                guidIsUnique = true;
            }
        }

        const newBusiness = await Business.create({
            id: data.id,
            be_GUID: businessGUID,
            dni_type: data.dni_type,
            dni: data.dni,
            address: data.address,
            business_details: data.businessDetails,
            legal_name: data.legalName.trim(),
            comercial_name: data.comercialName,
            association_date: data.associationDate,
            business_category_id: data.businessCategoryId,
            business_parent_id: data.businessParentId
        });

        logger.info(`Business registered successfully: ${newBusiness.legal_name}`);
        res.status(200).json({ legal_name: newBusiness.legal_name, message: 'Business registrado correctamente' });
    } catch (error) {
        logger.error(`Error registering Business: ${error}`);
        next(error);
    }
}

async function update(req, res, next) {
    const { id } = req.params;
    const businessupdated = req.body;
    try {
        logger.info(`Attempting to update Business with ID: ${id}`);

        const business = await Business.getById(id);
        if (!business) {
            logger.warn(`Business not found: ${id}`);
            throw new ValidationError('El comercio no se encuentra registrado');
        }
        businessupdated.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        await Business.update(id, businessupdated);

        logger.info(`Business updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating Business with ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallbusinesses(req, res, next) {
    try {
        logger.info('Fetching all Businesses');

        const businesses = await Businessview.getallBusinesses();
        res.status(200).json(businesses);

        logger.info('Businesses fetched successfully');
    } catch (error) {
        logger.error('Error fetching Businesses:', error);
        next(error);
    }
}

async function getallactivebusinesses(req, res, next) {
    try {
        logger.info('Fetching all active Businesses');

        const businesses = await Businessview.getallactiveBusinesses();
        res.status(200).json(businesses);

        logger.info('Businesses fetched successfully');
    } catch (error) {
        logger.error('Error fetching active Businesses:', error);
        next(error);
    }
}

async function getBusinessesByParent(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching Businesses by Parent ID: ${id}`);
        const parent = await Business.getById(id);
        if(!parent){
            throw new ValidationError('El negocio al que se asociará no se encuentra registrado');
        }
        const businessesbyparent = await Businessview.getAllbyParent(id);
        res.status(200).json(businessesbyparent);
        logger.info(`Businesses by Parent ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Businesses by Parent ID: ${id}, ${error}`);
        next(error);
    }
}

async function getBusinessesByCategory(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching Businesses by Category ID: ${id}`);
        const category = await BusinessCategory.getById(id);
        if(!category){
            throw new ValidationError('La categoria no se encuentra registrada');
        }
        const businessesbycategory = await Businessview.getAllbyCategory(id);
        res.status(200).json(businessesbycategory);
        logger.info(`Businesses by Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Businesses by Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function getAccountsByBusiness(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching Accounts by Business ID: ${id}`);
        const business = await Business.getById(id);
        if(!business){
            throw new ValidationError('El comercio no se encuentra registrado');
        }
        const accounts = await Bankaccount.getByBusiness(id);
        console.log(accounts);
        res.status(200).json(accounts);
        logger.info(`Businesses by Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Businesses by Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallbusinessescategories(req, res, next) {
    try {
        logger.info('Fetching all Business Categories');
        const categories = await BusinessCategory.getAll();
        res.status(200).json(categories);
        logger.info('Business Categories fetched successfully');
    } catch (error) {
        logger.error('Error fetching Business Categories:', error);
        next(error);
    }
}

async function getallactivebusinessescategories(req, res, next) {
    try {
        logger.info('Fetching all Business Categories');
        const categories = await BusinessCategory.getAllactive();
        res.status(200).json(categories);
        logger.info('Business Categories fetched successfully');
    } catch (error) {
        logger.error('Error fetching active Business Categories:', error);
        next(error);
    }
}

async function getBusinessCategory(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching Business Category ID: ${id}`);
        const category = await BusinessCategory.getById(id);
        res.status(200).json(category);
        logger.info(`Business Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Business Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function updateCategory(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        logger.info(`Attempting to update Business Category with ID: ${id}`);

        const category = await BusinessCategory.getById(id);
        if (!category) {
            logger.warn(`Category not found: ${id}`);
            throw new ValidationError('La categoria no se encuentra registrada');
        }

        await BusinessCategory.update(id, data);

        logger.info(`Business Category updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating Business Category with ID: ${id}, ${error}`);
        next(error);
    }
}

async function registerCategory(req, res, next) {
    const data = req.body;
    try {
        logger.info(`Attempting to register Business Category with name: ${data.code_name}`);

        const category = await BusinessCategory.getByName(data.code_name.trim());
        if (category) {
            logger.warn(`Category already exists: ${data.code_name}`);
            throw new ValidationError('La categoria ya se encuentra registrada');
        }

        await BusinessCategory.create(data);

        logger.info(`Business Category registered successfully: ${data.code_name}`);
        res.status(200).json({ category: data.code_name, message: 'Business category registrada correctamente' });
    } catch (error) {
        logger.error(`Error registering Business Category: ${data.code_name}, ${error}`);
        next(error);
    }
}

module.exports = { register, update, getallbusinesses,getallactivebusinesses,getBusinessesByParent,getBusinessesByCategory,getAccountsByBusiness,getallbusinessescategories,getallactivebusinessescategories,getBusinessCategory,updateCategory,registerCategory};