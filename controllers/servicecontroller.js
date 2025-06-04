const {json} = require('express')
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const PasswordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Serviceview = require('../models/Serviceview');
const Role = require('../models/Role');
const Service = require('../models/Service');
const Bank = require('../models/Bank');
const Terminal = require('../models/Terminal');
const moment = require('moment-timezone');
const { ValidationError } = require('../middleware/errorhandler');
const logger = require('../config/logger');



async function create(req, res, next) {
    const { service, description, isPOS } = req.body;
    try {
        logger.info(`Attempting to create service with data: ${JSON.stringify(req.body)}`);

        const existingService = await Service.getByName(service);
        if (existingService) {
            logger.warn(`Service already exists: ${service}`);
            throw new ValidationError('El servicio ya se encuentra registrado');
        }

        const newService = await Service.create({
            service: service,
            description: description,
            isPOS: isPOS
        });

        logger.info(`Service created successfully: ${newService.service}`);
        res.status(200).json({ service: newService.service, message: 'Servicio registrado correctamente' });
    } catch (error) {
        logger.error(`Error creating service: ${error}`);
        next(error);
    }
}

async function updateService(req, res, next) {
    const { id } = req.params;
    let serviceupdated = req.body;
    try {
        logger.info(`Attempting to update service with ID: ${id}`);

        const service = await Service.getById(id);
        if (!service) {
            logger.warn(`Service not found: ${id}`);
            throw new ValidationError('El servicio no esta registrado');
        }
        serviceupdated.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        await Service.update(id, serviceupdated);
        logger.info(`Service updated successfully: ${id}`);
        res.status(200).json({ message: 'Servicio actualizado exitosamente' });
    } catch (error) {
        logger.error(`Error updating service with ID: ${id}, ${error}`);
        next(error);
    }
}

async function asignforTerminal(req, res, next) {
    try {
        const { terminalID, serviceID } = req.body;
        logger.info(`Attempting to assign service to terminal: ${JSON.stringify(req.body)}`);

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const terminal = await Terminal.getById(terminalID);
        if (!terminal) {
            logger.warn(`terminal not found: ${terminalID}`);
            throw new ValidationError('El terminal no se encuentra registrado');
        }

        const terminal_service = await Service.getServiceTerminal(terminalID, serviceID);
        if (terminal_service) {
            logger.warn(`Service already assigned to terminal: ${JSON.stringify({ terminalID, serviceID })}`);
            throw new ValidationError('El terminal ya tiene el servicio asignado');
        }

        let assignation = await Service.asigntoTerminal({
            terminalID: terminalID,
            serviceID: serviceID
        });

        logger.info(`Service assigned to terminal successfully: ${JSON.stringify(assignation)}`);
        res.status(200).json({ serviceassigned: assignation.serviceID, terminal: assignation.terminalID, message: 'Servicio asignado correctamente al terminal' });
    } catch (error) {
        logger.error(`Error assigning service to terminal: ${error}`);
        next(error);
    }
}

async function unasignforTerminal(req, res, next) {
    try {
        const { terminalID, serviceID } = req.body;
        logger.info(`Attempting to unassign service from terminal: ${JSON.stringify(req.body)}`);

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const terminal = await Terminal.getById(terminalID);
        if (!terminal) {
            logger.warn(`terminal not found: ${terminalID}`);
            throw new ValidationError('El terminal no se encuentra registrado');
        }

        const terminal_service = await Service.getServiceTerminal(terminalID, serviceID);
        if (!terminal_service) {
            logger.warn(`Service not assigned to terminal: ${JSON.stringify({ terminalID, serviceID })}`);
            throw new ValidationError('El terminal no tiene el servicio asignado');
        }

        await Service.unasigntoTerminal({
            terminalID: terminalID,
            serviceID: serviceID
        });

        logger.info(`Service unassigned from terminal successfully: ${JSON.stringify({ terminalID, serviceID })}`);
        res.status(200).json({ message: 'Servicio desasignado exitosamente' });
    } catch (error) {
        logger.error(`Error unassigning service from terminal: ${error}`);
        next(error);
    }
}

async function asignforBank(req, res, next) {
    try {
        const { bankID, serviceID } = req.body;
        logger.info(`Attempting to assign service to terminal: ${JSON.stringify(req.body)}`);

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const bank = await Bank.getById(bankID);
        if (!bank) {
            logger.warn(`bank not found: ${bankID}`);
            throw new ValidationError('El banco no se encuentra registrado');
        }

        const bank_service = await Service.getServiceBank(bankID, serviceID);
        if (bank_service) {
            logger.warn(`Service already assigned to bank: ${JSON.stringify({ bankID, serviceID })}`);
            throw new ValidationError('El banco ya tiene el servicio asignado');
        }

        let assignation = await Service.asigntoBank({
            bankID: bankID,
            serviceID: serviceID
        });

        logger.info(`Service assigned to bank successfully: ${JSON.stringify(assignation)}`);
        res.status(200).json({ serviceassigned: assignation.serviceID, bank: assignation.bankID, message: 'Servicio asignado correctamente al banco' });
    } catch (error) {
        logger.error(`Error assigning service to terminal: ${error}`);
        next(error);
    }
}

async function unasignforBank(req, res, next) {
    try {
        const { bankID, serviceID } = req.body;
        logger.info(`Attempting to unassign service from bank: ${JSON.stringify(req.body)}`);

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const bank = await Bank.getById(bankID);
        if (!bank) {
            logger.warn(`bank not found: ${bankID}`);
            throw new ValidationError('El banco no se encuentra registrado');
        }

        const bank_service = await Service.getServiceBank(bankID, serviceID);
        if (!bank_service) {
            logger.warn(`Service not assigned to bank: ${JSON.stringify({ bankID, serviceID })}`);
            throw new ValidationError('El banco no tiene el servicio asignado');
        }

        await Service.unasigntoBank({
            bankID: bankID,
            serviceID: serviceID
        });

        logger.info(`Service unassigned from bank successfully: ${JSON.stringify({ bankID, serviceID })}`);
        res.status(200).json({ message: 'Servicio desasignado exitosamente' });
    } catch (error) {
        logger.error(`Error unassigning service from terminal: ${error}`);
        next(error);
    }
}

async function asignService(req, res, next) {
    const { userID, serviceID, terminalID,bankID,settings } = req.body;
    try {
        logger.info(`Attempting to assign service to user: ${JSON.stringify(req.body)}`);

        const user = await User.getById(userID);
        if (!user) {
            logger.warn(`User not found: ${userID}`);
            throw new ValidationError('El usuario no se encuentra registrado');
        }

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const terminal = await Terminal.getById(terminalID);
        if (!terminal) {
            logger.warn(`terminal not found: ${terminalID}`);
            throw new ValidationError('El terminal no se encuentra registrado');
        }

        const bank = await Bank.getById(bankID);
        if (!bank) {
            logger.warn(`bank not found: ${bankID}`);
            throw new ValidationError('El banco no se encuentra registrado');
        }

        const service_user_bank_terminal = await Service.getServiceUser(userID, serviceID, terminalID,bankID);
        if (service_user_bank_terminal) {
            logger.warn(`Service already assigned to: ${JSON.stringify({userID, serviceID, terminalID,bankID})}`);
            throw new ValidationError('El usuario ya tiene el servicio asociado');
        }

        let serviceassigned = await Service.asigntoUser({
            userID: userID,
            serviceID: serviceID,
            terminalID: terminalID,
            bankID: bankID,
            settings: settings
        });

        logger.info(`Service assigned to user successfully: ${JSON.stringify(serviceassigned)}`);
        res.status(200).json({ serviceassigned: serviceassigned.id, user: serviceassigned.userID, message: 'Servicio asignado correctamente' });
    } catch (error) {
        logger.error(`Error assigning service to user: ${error}`);
        next(error);
    }
}

async function unasignService(req, res, next) {
    const {  userID, serviceID, terminalID,bankID} = req.body;
    try {
        logger.info(`Attempting to unassign service from user: ${JSON.stringify(req.body)}`);

        const user = await User.getById(userID);
        if (!user) {
            logger.warn(`User not found: ${userID}`);
            throw new ValidationError('El usuario no se encuentra registrado');
        }

        const service = await Service.getById(serviceID);
        if (!service) {
            logger.warn(`Service not found: ${serviceID}`);
            throw new ValidationError('El servicio no se encuentra registrado');
        }

        const terminal = await Terminal.getById(terminalID);
        if (!terminal) {
            logger.warn(`terminal not found: ${terminalID}`);
            throw new ValidationError('El terminal no se encuentra registrado');
        }

        const bank = await Bank.getById(bankID);
        if (!bank) {
            logger.warn(`bank not found: ${bankID}`);
            throw new ValidationError('El banco no se encuentra registrado');
        }

        const service_user_bank_terminal = await Service.getServiceUser(userID, serviceID, terminalID,bankID);
        if (!service_user_bank_terminal) {
            logger.warn(`Service not assigned to user: ${JSON.stringify({ userID, serviceID })}`);
            throw new ValidationError('El usuario no tiene el servicio asociado');
        }

        await Service.unasingtoUser(service_user);

        logger.info(`Service unassigned from user successfully: ${JSON.stringify({ userID, serviceID })}`);
        res.status(200).json({ serviceunassigned: service_user.serviceID, user: service_user.userID, message: 'Servicio desasociado correctamente' });
    } catch (error) {
        logger.error(`Error unassigning service from user: ${error}`);
        next(error);
    }
}

async function getallservices(req, res, next) {
    try {
        logger.info('Fetching all services');
        const allservices = await Serviceview.getAllservices();
        res.status(200).json(allservices);
    } catch (error) {
        logger.error(`Error fetching all services: ${error}`);
        next(error);
    }
}

async function getServicesbyUser(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching services for user ID: ${id}`);
        const servicesbyuser = await Service.getServicesByUser(id);
        res.status(200).json(servicesbyuser);
    } catch (error) {
        logger.error(`Error fetching services for user ID: ${id}, ${error}`);
        next(error);
    }
}

async function getSettingsbyService(req, res, next) {
    const { userID, serviceID, terminalID,bankID } = req.body;
    try {
        logger.info(`Fetching settings for service: ${JSON.stringify({ userID, serviceID, terminalID,bankID})}`);
        let service_user = await Service.getServiceUser(userID, serviceID, terminalID,bankID);
        if (!service_user){
            logger.warn(`Service not assigned to user in terminal: ${JSON.stringify({ userID, serviceID , terminalID,bankID})}`);
            throw new ValidationError('El usuario no tiene el servicio asociado para ese terminal');
        }
        service_user.settings = JSON.parse(service_user.settings);
        logger.info(`Settings fetched successfully for service: ${JSON.stringify({ userID, serviceID , terminalID,bankID})}`);
        res.status(200).json(service_user);
    } catch (error) {
        logger.error(`Error fetching settings for service: ${JSON.stringify({ userID, serviceID , terminalID,bankID})}, ${error}`);
        next(error);
    }
}


async function getServicesInCommon(req, res, next) {
    const {terminalID,bankID } = req.params;
    try {
        logger.info(`Fetching services in common for: ${JSON.stringify({terminalID,bankID})}`);
        const terminal = await Terminal.getById(terminalID);
        if (!terminal) {
            logger.warn(`terminal not found: ${terminalID}`);
            throw new ValidationError('El terminal no se encuentra registrado');
        }
        const bank = await Bank.getById(bankID);
        if (!bank) {
            logger.warn(`bank not found: ${bankID}`);
            throw new ValidationError('El banco no se encuentra registrado');
        }
        const servicesincommon = await Service.getServicesInCommon(terminalID,bankID);
        res.status(200).json(servicesincommon);
    } catch (error) {
        logger.error(`Error fetching services in common: ${JSON.stringify({ terminalID,bankID })}, ${error}`);
        next(error);
    }
}

module.exports ={asignService,unasignService,create,updateService,getallservices,getServicesbyUser,getSettingsbyService,asignforTerminal,unasignforTerminal,getServicesInCommon,asignforBank,unasignforBank}