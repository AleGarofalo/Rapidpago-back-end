const Sector = require('../models/Sector');
const IndustryType = require('../models/IndustryType');
const Country = require('../models/Country');
const State = require('../models/State');
const City = require('../models/City');
const Municipality = require('../models/Municipality');
const Parish = require('../models/Parish');
const PostalZone = require('../models/PostalZone');
const moment = require('moment-timezone');
const logger = require('../config/logger');
const { ValidationError } = require('../middleware/errorhandler');

async function getallsectors(req,res,next){
    try {
        logger.info('Fetching all sectors');
        const sectors = await Sector.getAll();
        res.status(200).json(sectors);
    } catch (error) {
        logger.error(`Error fetching all sectors - ${error.message}`);
        next(error);
    }
}

async function getallactivesectors(req,res,next){
    try {
        logger.info('Fetching all active sectors');
        const sectors = await Sector.getAllActive();
        res.status(200).json(sectors);
    } catch (error) {
        logger.error(`Error fetching all active sectors - ${error.message}`);
        next(error);
    }
}

async function getsectorbyid(req, res, next) {
    const {id} = req.params
    try {
        logger.info('Fetching sector ID: ${id}');
        const Sectorcito = await Sector.getById(id);
        res.status(200).json(Sectorcito);
    } catch (error) {
        logger.error(`Error fetching sector - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function createSector(req, res,next) {
    const { sector } = req.body;
    try {
        logger.info(`Attempting to create sector with number: ${sector}`);

        // Verificar si el sector ya existe en la base de datos
        const existingSector = await Sector.getBySector(sector);
        if (existingSector) {
            logger.warn(`Sector already exists: ${sector}`);
            return res.status(400).json({ message: 'El sector ya existe' });
        }

        // Insertar el nuevo sector en la base de datos
        await Sector.create({ sector });

        logger.info(`Sector created successfully: ${sector}`);
        res.status(201).json({ message: 'Sector creado correctamente' });
    } catch (error) {
        logger.error(`Error creating sector - ${error.message}`);
        next(error);
    }
}

async function updateSector(req, res,next) {
    const { id } = req.params;
    const { sector_number } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update sector with ID: ${id}`);

        const existingSector = await Sector.getById(id);
        if (!existingSector) {
            logger.warn(`Sector does not exist: ${id}`);
            return res.status(400).json({ message: 'El sector no existe' });
        }
        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')
        // Actualizar el rol en la base de datos
        await Sector.update(id,data);
        logger.info(`Sector updated successfully: ${id}`);
        res.json({ message: 'Sector actualizado correctamente' });
    } catch (error) {
        logger.error(`Error updating sector - ${error.message}`);
        next(error);
    }
}

async function deleteSector(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Deleting sector ID: ${id}`);
        await Sector.delete(id);
        res.status(204).end();
    } catch (error) {
        logger.error(`Error deleting sector - ${error.message}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/

async function getallindustries(req,res,next){
    try {
        logger.info('Fetching all industries');
        const industries = await IndustryType.getAll();
        res.status(200).json(industries);
    } catch (error) {
        logger.error(`Error fetching all industries - ${error.message}`);
        next(error);
    }
}

async function getallactiveindustries(req,res,next){
    try {
        logger.info('Fetching all active industries');
        const industries = await IndustryType.getAllActive();
        res.status(200).json(industries);
    } catch (error) {
        logger.error(`Error fetching all active industries - ${error.message}`);
        next(error);
    }
}

async function getIndustryTypeById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching industry type ID: ${id}`);
        const industryType = await IndustryType.getById(id);
        res.status(200).json(industryType);
    } catch (error) {
        logger.error(`Error fetching industry type - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function createIndustryType(req, res, next) {
    const {industrytype,sectorid } = req.body;
    try {
        logger.info(`Attempting to create industry type: ${industrytype}`);
        const existingType = await IndustryType.getByType(industrytype);
        if (existingType) {
            logger.warn(`Industry type already exists: ${industrytype}`);
            return res.status(400).json({ message: 'El tipo de industria ya existe.' });
        }
        const newType = await IndustryType.create({industrytype,sectorid });
        logger.info(`Industry type created: ${industrytype}`);
        res.status(201).json(newType);
    } catch (error) {
        logger.error(`Error creating industry type - ${error.message}`);
        next(error);
    }
}

async function updateIndustryType(req, res, next) {
    const { id } = req.params;
    const { type } = req.body;
    const data = req.body;
    try {
        logger.info(`Updating industry type ID: ${id}`);
        const updatedType = await IndustryType.update(id, { type });
        res.status(200).json(updatedType);
    } catch (error) {
        logger.error(`Error updating industry type - ${error.message}`);
        next(error);
    }
}

async function deleteIndustryType(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Deleting industry type ID: ${id}`);
        await IndustryType.delete(id);
        res.status(204).end();
    } catch (error) {
        logger.error(`Error deleting industry type - ${error.message}`);
        next(error);
    }
}

async function getindustriesbysector(req,res,next){
    try {
        const {id} = req.params
        const sector = await Sector.getById(id);
        if(!sector){
            logger.warn(`Sector does not exist: ${sector}`);
            throw new ValidationError('El sector no se encuentra registrado');
        }
        logger.info(`Fetching industries for sector ID: ${id}`);
        const industries = await IndustryType.getAllbySector(id);
        res.status(200).json(industries);
    } catch (error) {
        logger.error(`Error fetching industries for sector ID: ${id} - ${error.message}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/

async function getallcountries(req,res,next){
    try {
        logger.info('Fetching all countries');
        const countries = await Country.getAll();
        res.status(200).json(countries);
    } catch (error) {
        logger.error(`Error fetching all countries - ${error.message}`);
        next(error);
    }
}

async function getallactivecountries(req,res,next){
    try {
        logger.info('Fetching all active countries');
        const countries = await Country.getAllActive();
        res.status(200).json(countries);
    } catch (error) {
        logger.error(`Error fetching all active countries - ${error.message}`);
        next(error);
    }
}

async function getCountryById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching country ID: ${id}`);
        const country = await Country.getById(id);
        res.status(200).json(country);
    } catch (error) {
        logger.error(`Error fetching country - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function createCountry(req, res,next) {
    const { country, iso_3166_1, iso_3166_2, iso_3166_num,userID} = req.body;
    try {
        logger.info(`Attempting to create country: ${country}`);

        // Verificar si el país ya existe en la base de datos
        const existingCountry = await Country.getByName(country);
        if (existingCountry) {
            logger.warn(`Country already exists: ${country}`);
            return res.status(400).json({ message: 'El país ya existe' });
        }

        // Insertar el nuevo país en la base de datos
        const elcountry = await Country.create({ country, iso_3166_1, iso_3166_2, iso_3166_num });

        logger.info(`Country created successfully: ${country}`);
        res.status(201).json(
            { 
                message: 'País creado correctamente',
                data: elcountry
            }
        );
    } catch (error) {
        logger.error(`Error creating country: ${error}`);
        next(error);
    }
}

async function updateCountry(req, res,next) {
    const { id } = req.params;
    const updatedcountry = req.body;
    try {
        logger.info(`Attempting to update country with ID: ${id}`);

        const existingCountry = await Country.getById(id);
        if (!existingCountry) {
            logger.warn(`Country does not exist: ${id}`);
            return res.status(400).json({ message: 'El país no existe' });
        }

        updatedcountry.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar el país en la base de datos
        await Country.update(id, updatedcountry);
        logger.info(`Country updated successfully: ${id}`);
        res.json({
            message: 'País actualizado correctamente',
            data: updatedcountry // Devolver el país actualizado si es necesario
        });
    } catch (error) {
        logger.error(`Error updating country with ID: ${id}, ${error}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/

async function getallstates(req,res,next){
    try {
        logger.info('Fetching all states');
        const states = await State.getAll();
        res.status(200).json(states);
    } catch (error) {
        logger.error(`Error fetching all states - ${error.message}`);
        next(error);
    }
}

async function getallactivestates(req,res,next){
    try {
        logger.info('Fetching all active states');
        const states = await State.getAllActive();
        res.status(200).json(states);
    } catch (error) {
        logger.error(`Error fetching all active states - ${error.message}`);
        next(error);
    }
}

async function getStateById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching state ID: ${id}`);
        const state = await State.getById(id);
        res.status(200).json(state);
    } catch (error) {
        logger.error(`Error fetching state - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function createState(req, res,next) {
    const { state, iso_3166_2, countryid } = req.body;
    try {
        logger.info(`Attempting to create state: ${state}`);

        // Verificar si el país al que se referencia existe
        const existingCountry = await Country.getById(countryid);
        if (!existingCountry) {
            logger.warn(`Country does not exist: ${countryid}`);
            return res.status(400).json({ message: 'El país no existe' });
        }

        const existingState = await State.getByName(state);
        if (existingState) {
            logger.warn(`State already exists: ${state}`);
            return res.status(400).json({ message: 'El estado ya existe' });
        }

        // Insertar el nuevo estado en la base de datos
        await State.create({ state, iso_3166_2, countryid });

        logger.info(`State created successfully: ${state}`);
        res.status(201).json({ message: 'Estado creado correctamente' });
    } catch (error) {
        logger.error(`Error creating state: ${error}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function updateState(req, res,next) {
    const { id } = req.params;
    const { countryid } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update state with ID: ${id}`);

        const existingState = await State.getById(id);
        if (!existingState) {
            logger.warn(`State does not exist: ${id}`);
            return res.status(400).json({ message: 'El estado no existe' });
        }

        // Si se incluye countryid en la actualización, verificar si el país existe
        if (countryid) {
            const existingCountry = await Country.getById(countryid);
            if (!existingCountry) {
                logger.warn(`Country does not exist: ${countryid}`);
                return res.status(400).json({ message: 'El país no existe' });
            }
        }

        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar el estado en la base de datos
        await State.update(id, data);
        logger.info(`State updated successfully: ${id}`);
        res.json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        logger.error(`Error updating state with ID: ${id}, ${error}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function getstatesbycountry(req,res,next){
    const {id} = req.params
    try {
        const country = await Country.getById(id);
        if(!country){
            logger.warn(`Country does not exist: ${country}`);
            throw new ValidationError('El pais no se encuentra registrado');
        }
        logger.info(`Fetching states for country ID: ${id}`);
        const states = await State.getAllbyCountry(id);
        res.status(200).json(states);
    } catch (error) {
        logger.error(`Error fetching states for country ID: ${id} - ${error.message}`);
        next(error);
    }
}


/*-------------------------------------------------------------------------*/

async function getallcities(req,res,next){
    try {
        logger.info('Fetching all cities');
        const cities = await City.getAll();
        res.status(200).json(cities);
    } catch (error) {
        logger.error(`Error fetching all states - ${error.message}`);
        next(error);
    }
}

async function getallactivecities(req,res,next){
    try {
        logger.info('Fetching all active cities');
        const cities = await City.getAllActive();
        res.status(200).json(cities);
    } catch (error) {
        logger.error(`Error fetching all active states - ${error.message}`);
        next(error);
    }
}


async function getCityById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching city ID: ${id}`);
        const city = await City.getById(id);
        res.status(200).json(city);
    } catch (error) {
        logger.error(`Error fetching city - ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function createCity(req, res,next) {
    const { city, capital, stateid } = req.body;
    try {
        logger.info(`Attempting to create city: ${city}`);

        // Verificar si el estado al que se referencia existe
        const existingState = await State.getById(stateid);
        if (!existingState) {
            logger.warn(`State does not exist: ${stateid}`);
            return res.status(400).json({ message: 'El estado no existe' });
        }

        const existingCity = await City.getByName(city);
        if (existingCity) {
            logger.warn(`City already exists: ${city}`);
            return res.status(400).json({ message: 'La ciudad ya existe' });
        }

        // Insertar la nueva ciudad en la base de datos
        await City.create({ city, capital, stateid });

        logger.info(`City created successfully: ${city}`);
        res.status(201).json({ message: 'Ciudad creada correctamente' });
    } catch (error) {
        logger.error(`Error creating city: ${error}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function updateCity(req, res,next) {
    const { id } = req.params;
    const { stateid } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update city with ID: ${id}`);

        const existingCity = await City.getById(id);
        if (!existingCity) {
            logger.warn(`City does not exist: ${id}`);
            return res.status(400).json({ message: 'La ciudad no existe' });
        }

        // Si se incluye stateid en la actualización, verificar si el estado existe
        if (stateid) {
            const existingState = await State.getById(stateid);
            if (!existingState) {
                logger.warn(`State does not exist: ${stateid}`);
                return res.status(400).json({ message: 'El estado no existe' });
            }
        }

        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar la ciudad en la base de datos
        await City.update(id, data);
        logger.info(`City updated successfully: ${id}`);
        res.json({ message: 'Ciudad actualizada correctamente' });
    } catch (error) {
        logger.error(`Error updating city with ID: ${id}, ${error}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

async function getcitiesbystate(req,res,next){
    try {
        const {id} = req.params
        const state = await State.getById(id);
        if(!state){
            logger.warn(`state does not exist: ${state}`);
            throw new ValidationError('El estado no se encuentra registrado');
        }
        logger.info(`Fetching cities for state ID: ${id}`);
        const cities = await City.getAllbyState(id);
        res.status(200).json(cities);
    } catch (error) {
        logger.error(`Error fetching cities for state ID: ${id} - ${error.message}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/

async function getAllMunicipalities(req, res, next) {
    try {
        logger.info('Fetching all municipalities');
        const municipalities = await Municipality.getAll();
        res.status(200).json(municipalities);
    } catch (error) {
        logger.error(`Error fetching all municipalities - ${error.message}`);
        next(error);
    }
}

async function getAllactiveMunicipalities(req, res, next) {
    try {
        logger.info('Fetching all active municipalities');
        const municipalities = await Municipality.getAllActive();
        res.status(200).json(municipalities);
    } catch (error) {
        logger.error(`Error fetching all active municipalities - ${error.message}`);
        next(error);
    }
}

async function getMunicipalityById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching municipality ID: ${id}`);
        const municipality = await Municipality.getById(id);
        res.status(200).json(municipality);
    } catch (error) {
        logger.error(`Error fetching municipality - ${error.message}`);
        next(error);
    }
}

// Crear un nuevo municipio
async function createMunicipality(req, res, next) {
    const { municipality, stateid } = req.body;
    try {
        logger.info(`Attempting to create municipality: ${municipality}`);

        // Verificar si el estado al que se referencia existe
        const existingState = await State.getById(stateid);
        if (!existingState) {
            logger.warn(`State does not exist: ${stateid}`);
            return res.status(400).json({ message: 'El estado no existe' });
        }

        const existingMunicipality = await Municipality.getByName(municipality);
        if (existingMunicipality) {
            logger.warn(`City already exists: ${municipality}`);
            return res.status(400).json({ message: 'El municipio ya existe' });
        }

        // Insertar el nuevo municipio en la base de datos
        await Municipality.create({ municipality, stateid });

        logger.info(`Municipality created successfully: ${municipality}`);
        res.status(201).json({ message: 'Municipio creado correctamente' });
    } catch (error) {
        logger.error(`Error creating municipality: ${error.message}`);
        next(error);
    }
}

// Actualizar un municipio
async function updateMunicipality(req, res, next) {
    const { id } = req.params;
    const { stateid } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update municipality with ID: ${id}`);

        const existingMunicipality = await Municipality.getById(id);
        if (!existingMunicipality) {
            logger.warn(`Municipality does not exist: ${id}`);
            return res.status(400).json({ message: 'El municipio no existe' });
        }

        // Si se incluye stateid en la actualización, verificar si el estado existe
        if (stateid) {
            const existingState = await State.getById(stateid);
            if (!existingState) {
                logger.warn(`State does not exist: ${stateid}`);
                return res.status(400).json({ message: 'El estado no existe' });
            }
        }

        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar el municipio en la base de datos
        await Municipality.update(id, data);
        logger.info(`Municipality updated successfully: ${id}`);
        res.json({ message: 'Municipio actualizado correctamente' });
    } catch (error) {
        logger.error(`Error updating municipality with ID: ${id} - ${error.message}`);
        next(error);
    }
}

async function getmunicipalitiesbystate(req,res,next){
    try {
        const {id} = req.params
        const state = await State.getById(id);
        if(!state){
            logger.warn(`state does not exist: ${state}`);
            throw new ValidationError('El estado no se encuentra registrado');
        }
        logger.info(`Fetching municipalities for state ID: ${id}`);
        const municipalities = await Municipality.getAllbyState(id);
        res.status(200).json(municipalities);
    } catch (error) {
        logger.error(`Error fetching municipalities for state ID: ${id} - ${error.message}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/


async function getAllParishes(req, res, next) {
    try {
        logger.info('Fetching all parishes');
        const parishes = await Parish.getAll();
        res.status(200).json(parishes);
    } catch (error) {
        logger.error(`Error fetching all parishes - ${error.message}`);
        next(error);
    }
}

async function getAllactiveParishes(req, res, next) {
    try {
        logger.info('Fetching all active parishes');
        const parishes = await Parish.getAllActive();
        res.status(200).json(parishes);
    } catch (error) {
        logger.error(`Error fetching all active parishes - ${error.message}`);
        next(error);
    }
}

async function getParishById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching parish ID: ${id}`);
        const parish = await Parish.getById(id);
        res.status(200).json(parish);
    } catch (error) {
        logger.error(`Error fetching parish - ${error.message}`);
        next(error);
    }
}

async function createParish(req, res, next) {
    const { parish, municipalityid } = req.body;
    try {
        logger.info(`Attempting to create parish: ${parish}`);

        // Verificar si el municipio al que se referencia existe
        const existingMunicipality = await Municipality.getById(municipalityid);
        if (!existingMunicipality) {
            logger.warn(`Municipality does not exist: ${municipalityid}`);
            return res.status(400).json({ message: 'El municipio no existe' });
        }

        const existingParish = await Parish.getByName(parish);
        if (existingParish) {
            logger.warn(`Parish already exists: ${parish}`);
            return res.status(400).json({ message: 'La parroquia ya existe' });
        }

        // Insertar el nuevo barrio en la base de datos
        await Parish.create({ parish, municipalityid });

        logger.info(`Parish created successfully: ${parish}`);
        res.status(201).json({ message: 'Barrio creado correctamente' });
    } catch (error) {
        logger.error(`Error creating parish: ${error.message}`);
        next(error);
    }
}

async function updateParish(req, res, next) {
    const { id } = req.params;
    const { municipalityid } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update parish with ID: ${id}`);

        const existingParish = await Parish.getById(id);
        if (!existingParish) {
            logger.warn(`Parish does not exist: ${id}`);
            return res.status(400).json({ message: 'El barrio no existe' });
        }

        // Si se incluye municipalityid en la actualización, verificar si el municipio existe
        if (municipalityid) {
            const existingMunicipality = await Municipality.getById(municipalityid);
            if (!existingMunicipality) {
                logger.warn(`Municipality does not exist: ${municipalityid}`);
                return res.status(400).json({ message: 'El municipio no existe' });
            }
        }

        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar el barrio en la base de datos
        await Parish.update(id, data);
        logger.info(`Parish updated successfully: ${id}`);
        res.json({ message: 'Barrio actualizado correctamente' });
    } catch (error) {
        logger.error(`Error updating parish with ID: ${id} - ${error.message}`);
        next(error);
    }
}

async function getparishesbymunicipality(req,res,next){
    try {
        const {id} = req.params
        const municipality = await Municipality.getById(id);
        if(!municipality){
            logger.warn(`municipality does not exist: ${municipality}`);
            throw new ValidationError('El municipio no se encuentra registrado');
        }
        logger.info(`Fetching parishes for municipality ID: ${id}`);
        const parishes = await Parish.getAllbyMunicipality(id);
        res.status(200).json(parishes);
    } catch (error) {
        logger.error(`Error fetching parishes for municipality ID: ${id} - ${error.message}`);
        next(error);
    }
}

/*-------------------------------------------------------------------------*/

async function getAllPostalZones(req, res, next) {
    try {
        logger.info('Fetching all postal zones');
        const postalZones = await PostalZone.getAll();
        res.status(200).json(postalZones);
    } catch (error) {
        logger.error(`Error fetching all postal zones - ${error.message}`);
        next(error);
    }
}

async function getAllactivePostalZones(req, res, next) {
    try {
        logger.info('Fetching all active postal zones');
        const postalZones = await PostalZone.getAllActive();
        res.status(200).json(postalZones);
    } catch (error) {
        logger.error(`Error fetching all active postal zones - ${error.message}`);
        next(error);
    }
}

async function getPostalZoneById(req, res, next) {
    const { id } = req.params;
    try {
        logger.info(`Fetching postal zone ID: ${id}`);
        const postalZone = await PostalZone.getById(id);
        res.status(200).json(postalZone);
    } catch (error) {
        logger.error(`Error fetching postal zone - ${error.message}`);
        next(error);
    }
}

async function createPostalZone(req, res, next) {
    const { postal_code, town, parishid } = req.body;
    try {
        logger.info(`Attempting to create postal zone: ${postal_code}`);

        // Verificar si la parroquia a la que se referencia existe
        const existingParish = await Parish.getById(parishid);
        if (!existingParish) {
            logger.warn(`Parish does not exist: ${parishid}`);
            return res.status(400).json({ message: 'La parroquia no existe' });
        }

        const existingPostal = await PostalZone.getByName(postal_code);
        if (existingPostal) {
            logger.warn(`Postal Zone already exists: ${postal_code}`);
            return res.status(400).json({ message: 'El codigo postal ya existe' });
        }

        // Insertar la nueva zona postal en la base de datos
        await PostalZone.create({ postal_code, town, parishid });

        logger.info(`Postal zone created successfully: ${postal_code}`);
        res.status(201).json({ message: 'Zona postal creada correctamente' });
    } catch (error) {
        logger.error(`Error creating postal zone: ${error.message}`);
        next(error);
    }
}

async function updatePostalZone(req, res, next) {
    const { id } = req.params;
    const { parishid } = req.body;
    const data = req.body;
    try {
        logger.info(`Attempting to update postal zone with ID: ${id}`);

        const existingPostalZone = await PostalZone.getById(id);
        if (!existingPostalZone) {
            logger.warn(`Postal zone does not exist: ${id}`);
            return res.status(400).json({ message: 'La zona postal no existe' });
        }

        // Si se incluye parishid en la actualización, verificar si la parroquia existe
        if (parishid) {
            const existingParish = await Parish.getById(parishid);
            if (!existingParish) {
                logger.warn(`Parish does not exist: ${parishid}`);
                return res.status(400).json({ message: 'La parroquia no existe' });
            }
        }

        data.updated_at = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
        // Actualizar la zona postal en la base de datos
        await PostalZone.update(id, data);
        logger.info(`Postal zone updated successfully: ${id}`);
        res.json({ message: 'Zona postal actualizada correctamente' });
    } catch (error) {
        logger.error(`Error updating postal zone with ID: ${id} - ${error.message}`);
        next(error);
    }
}

async function getpostalzonesbyparish(req,res,next){
    try {
        const {id} = req.params
        const parish = await Parish.getById(id);
        if(!parish){
            logger.warn(`parish does not exist: ${parish}`);
            throw new ValidationError('La parroquia no se encuentra registrado');
        }
        logger.info(`Fetching postal zones for parish ID: ${id}`);
        const postalZones = await PostalZone.getAllbyParish(id);
        res.status(200).json(postalZones);
    } catch (error) {
        logger.error(`Error fetching postal zones for parish ID: ${id} - ${error.message}`);
        next(error);
    }
}

module.exports ={
    getallsectors,getallactivesectors,getsectorbyid,createSector,updateSector,deleteSector,
    getallindustries,getallactiveindustries,getIndustryTypeById,createIndustryType,updateIndustryType,deleteIndustryType,getindustriesbysector,
    getallcountries,getallactivecountries,getCountryById,createCountry,updateCountry,
    getallstates,getallactivestates,getStateById,createState,updateState,getstatesbycountry,
    getallcities,getallactivecities,getCityById,createCity,updateCity,getcitiesbystate,
    getAllMunicipalities,getAllactiveMunicipalities,getMunicipalityById,getmunicipalitiesbystate,createMunicipality,updateMunicipality,
    getAllParishes,getAllactiveParishes,getParishById,createParish,updateParish,getparishesbymunicipality,
    getAllPostalZones,getAllactivePostalZones,getPostalZoneById,createPostalZone,updatePostalZone,getpostalzonesbyparish
}