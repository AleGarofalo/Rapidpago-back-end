const {json} = require('express')
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const PasswordValidator = require('password-validator');
const { ValidationError } = require('../middleware/errorhandler');
const Business = require ('../models/Business');
const PointSale = require ('../models/PointSale');
const Bankaccount = require('../models/Bankaccount')
const Service = require('../models/Service')
const Terminal = require ('../models/Terminal');
const TerminalCategory = require ('../models/TerminalCategory');
const TerminalService = require('../models/TerminalService');
const TerminalCategoryview = require ('../models/TerminalCategoryview');
const User = require('../models/User');
const moment = require('moment-timezone');
const logger = require('../config/logger');


async function create(req, res, next) {
    try {
        const { name, description, app_param, fee, terminal_category_id, point_sale_id, association_date } = req.body;
        logger.info(`Creating terminal with data: ${JSON.stringify(req.body)}`);

        const category = await TerminalCategory.getById(terminal_category_id);
        if (!category) {
            logger.warn(`Category not found: ${terminal_category_id}`);
            throw new ValidationError('La categoria asociada no existe.');
        }
        const pos = await PointSale.getById(point_sale_id);
        if (!pos) {
            logger.warn(`Point of Sale not found: ${point_sale_id}`);
            throw new ValidationError('El pos asociado no existe.');
        }

        // Validar el nombre del terminal
        let terminalGUID;
        let guidIsUnique = false;

        while (!guidIsUnique) {
            terminalGUID = uuidv4();
            const rows = await Terminal.getByGUID(terminalGUID);
            if (rows == null) {
                guidIsUnique = true;
            }
        }

        const terminal = await Terminal.create({
            t_guid: terminalGUID,
            name: name,
            description: description,
            app_param: app_param,
            fee: fee,
            terminal_category_id: terminal_category_id,
            point_sale_id: point_sale_id,
            association_date: association_date
        });

        logger.info(`Terminal created successfully: ${terminal.name}`);
        res.status(200).json({ POS: terminal.name, message: 'terminal registrado correctamente' });
    } catch (error) {
        logger.error(`Error creating terminal: ${error}`);
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const terminal = await Terminal.getById(id);
        if (!terminal) {
            throw new ValidationError('El terminal no existe.');
        }
        data .updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        logger.info(`Updating terminal with ID: ${id}`);
        await Terminal.update(id, data);
        logger.info(`Terminal updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating terminal with ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallTerminal(req, res, next) {
    try {
        logger.info('Fetching all terminals');
        const terminal = await Terminal.getAll();
        res.status(200).json(terminal);
    } catch (error) {
        logger.error(`Error fetching all terminals: ${error}`);
        next(error);
    }
}

async function getTerminalByPOS(req, res, next) {
    try {
        const { id } = req.params;
        const pos = await PointSale.getById(id);
        if (!pos) {
            throw new ValidationError('El pos no existe.');
        }
        logger.info(`Fetching terminals for POS ID: ${id}`);
        const terminalbybusiness = await Terminal.getByPOS(id);
        res.status(200).json(terminalbybusiness);
    } catch (error) {
        logger.error(`Error fetching terminals for POS ID: ${id}, ${error}`);
        next(error);
    }
}

async function getTerminalBycategory(req, res, next) {
    try {
        const { id } = req.params;
        const category = await TerminalCategory.getById(id);
        if (!category) {
            throw new ValidationError('La categoria no existe.');
        }
        logger.info(`Fetching terminals for category ID: ${id}`);
        const terminalbycategory = await Terminal.getByCategory(id);
        res.status(200).json(terminalbycategory);
    } catch (error) {
        logger.error(`Error fetching terminals for category ID: ${id}, ${error}`);
        next(error);
    }
}

async function getTerminalByService(req, res, next) {
    try {
        const { id } = req.params;
        const service = await Service.getById(id);
        if (!service) {
            throw new ValidationError('El servicio no existe.');
        }
        logger.info(`Fetching terminals for service ID: ${id}`);
        const terminalbyservice = await Terminal.getByService(id);
        res.status(200).json(terminalbyservice);
    } catch (error) {
        logger.error(`Error fetching terminals for service ID: ${id}, ${error}`);
        next(error);
    }
}

async function getServicesByTerminal(req, res, next) {
    try {
        const { id } = req.params;
        const terminal = await Terminal.getById(id);
        if (!terminal) {
            throw new ValidationError('El terminal no existe.');
        }
        logger.info(`Fetching services for terminal ID: ${id}`);
        const servicesbyterminal = await Terminal.getServicesByTerminal(id);
        res.status(200).json(servicesbyterminal);
    } catch (error) {
        logger.error(`Error fetching services for terminal ID: ${id}, ${error}`);
        next(error);
    }
}

async function getAccountsByTerminal(req, res, next) {
    try {
        const { id } = req.params;
        const terminal = await Terminal.getById(id);
        if (!terminal) {
            throw new ValidationError('El terminal no existe.');
        }
        logger.info(`Fetching accounts for terminal ID: ${id}`);
        const accounts = await Bankaccount.getByTerminal(id);
        res.status(200).json(accounts);
    } catch (error) {
        logger.error(`Error fetching services for terminal ID: ${id}, ${error}`);
        next(error);
    }
}

async function getallterminalcategories(req, res, next) {
    try {
        logger.info('Fetching all terminal categories');
        const categories = await TerminalCategoryview.getAll();
        res.status(200).json(categories);
    } catch (error) {
        logger.error(`Error fetching all terminal categories: ${error}`);
        next(error);
    }
}

async function getallactiveterminalcategories(req, res, next) {
    try {
        logger.info('Fetching all terminal categories');
        const categories = await TerminalCategory.getAllactive();
        res.status(200).json(categories);
    } catch (error) {
        logger.error(`Error fetching all terminal categories: ${error}`);
        next(error);
    }
}

async function getTerminalCategory(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching Terminal Category ID: ${id}`);
        const category = await TerminalCategory.getById(id);
        res.status(200).json(category);
        logger.info(`Terminal Category ID: ${id} fetched successfully`);
    } catch (error) {
        logger.error(`Error fetching Terminal Category ID: ${id}, ${error}`);
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        logger.info(`Updating terminal category with ID: ${id}`);

        const category = await TerminalCategory.getById(id);
        if (!category) {
            logger.warn(`Category not found: ${id}`);
            throw new ValidationError('La categoria no se encuentra registrada');
        }

        await TerminalCategory.update(id, data);
        logger.info(`Terminal category updated successfully: ${id}`);
        res.status(200).json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
        logger.error(`Error updating terminal category with ID: ${id}, ${error}`);
        next(error);
    }
}

async function registerCategory(req, res, next) {
    try {
        const data = req.body;
        logger.info(`Registering new terminal category: ${data.code_name.trim()}`);

        const category = await TerminalCategory.getByname(data.code_name.trim());
        if (category) {
            logger.warn(`Category already exists: ${data.code_name.trim()}`);
            throw new ValidationError('La categoria de terminal ya se encuentra registrada');
        }

        await TerminalCategory.create(data);
        logger.info(`Terminal category registered successfully: ${data.code_name}`);
        res.status(200).json({ category: data.code_name, message: 'Terminal category registrada correctamente' });
    } catch (error) {
        logger.error(`Error registering terminal category: ${error}`);
        next(error);
    }
}


module.exports = {create,update,getallTerminal,getTerminalByPOS,getTerminalBycategory,getTerminalByService,getServicesByTerminal,getAccountsByTerminal,getallterminalcategories,getallactiveterminalcategories,getTerminalCategory,updateCategory,registerCategory}