const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Currency {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.symbol = data.symbol;
        this.exchange_rate = data.exchange_rate;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todas las monedas
    static async getAll() {
        const currencies = await this.knex('currencies').select();
        return currencies.map(c => new Currency(c));
    }

    static async getAllActive() {
        const currencies = await this.knex('currencies').where('active',true).select();
        return currencies.map(c => new Currency(c));
    }

    // Obtener moneda por ID
    static async getById(id) {
        const currency = await this.knex('currencies').where('id', id).first();
        if (!currency) {
            return null;
        }
        return new Currency(currency);
    }

    // Obtener moneda por nombre
    static async getByName(name) {
        const currency = await this.knex('currencies').where('name', name).first();
        if (!currency) {
            return null;
        }
        return new Currency(currency);
    }

    // Crear una nueva moneda
    static async create(data) {
        const [id] = await this.knex('currencies').insert(data);
        const currency = await this.knex('currencies').where('id', id).first();
        return new Currency(currency);
    }

    // Actualizar moneda existente
    static async update(id, data) {
        const affectedRows = await this.knex('currencies')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Currency not found');
        }
        return await this.getById(id);
    }

    // Eliminar una moneda
    static async delete(id) {
        const deletedCurrency = await this.knex('currencies').where('id', id).del();
        return deletedCurrency;
    }
}

module.exports = Currency;
