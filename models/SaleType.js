const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class SaleType {

    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los tipos de venta
    static async getAll() {
        const saleTypes = await this.knex('saletypes').select();
        return saleTypes.map(st => new SaleType(st));
    }

    // Obtener todos los tipos de venta activos
    static async getAllActive() {
        const saleTypes = await this.knex('saletypes').where('active', true).select();
        return saleTypes.map(st => new SaleType(st));
    }

    // Obtener tipo de venta por ID
    static async getById(id) {
        const saleType = await this.knex('saletypes').where('id', id).first();
        if (!saleType) {
            return null;
        }
        return new SaleType(saleType);
    }

    // Obtener tipo de venta por descripción
    static async getByDescription(description) {
        const saleType = await this.knex('saletypes').where('description', description).first();
        if (!saleType) {
            return null;
        }
        return new SaleType(saleType);
    }

    // Crear un nuevo tipo de venta
    static async create(data) {
        const [id] = await this.knex('saletypes').insert(data);
        const saleType = await this.knex('saletypes').where('id', id).first();
        return new SaleType(saleType);
    }

    // Actualizar un tipo de venta
    static async update(id, data) {
        const affectedRows = await this.knex('saletypes').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('SaleType not found');
        }
        return await this.getById(id);
    }

    // Eliminar un tipo de venta
    static async delete(id) {
        const deletedSaleType = await this.knex('saletypes').where('id', id).del();
        return deletedSaleType;
    }
}

module.exports = SaleType;
