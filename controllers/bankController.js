const Bank = require('../models/Bank');
const logger = require('../config/logger');

async function bankList(req, res) {
    try {
        const banks = await Bank.getByActiveAndAliance();

        return res.status(200).json({ banks });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function getServicesByBank(req, res, next) {
    try {
        const { id } = req.params;
        const bank = await Bank.getById(id);
        if (!bank) {
            throw new ValidationError('El banco no existe.');
        }
        logger.info(`Fetching services for bank ID: ${id}`);
        const servicesbyterminal = await Terminal.getServicesByTerminal(id);
        res.status(200).json(servicesbyterminal);
    } catch (error) {
        logger.error(`Error fetching services for terminal ID: ${id}, ${error}`);
        next(error);
    }
}

module.exports = {bankList,getServicesByBank};