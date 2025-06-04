const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class SaleParameter {
    constructor(data) {
        this.id = data.id;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.quota = data.quota;
        this.amount = data.amount;
        this.saletypeID = data.saletypeID;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los parámetros de venta
    static async getAll() {
        const saleParameters = await this.knex('saleparameters').select();
        return saleParameters.map(saleParameter => new SaleParameter(saleParameter));
    }

    // Obtener todos los parámetros activos
    static async getAllActive() {
        const saleParameters = await this.knex('saleparameters').where('active', true).select();
        return saleParameters.map(saleParameter => new SaleParameter(saleParameter));
    }

    // Obtener un parámetro de venta por ID
    static async getById(id) {
        const saleParameter = await this.knex('saleparameters').where('id', id).first();
        if (!saleParameter) {
            return null;
        }
        return new SaleParameter(saleParameter);
    }

    // Crear un nuevo parámetro de venta
    static async create(data) {
        const [id] = await this.knex('saleparameters').insert(data);
        const saleParameter = await this.knex('saleparameters').where('id', id).first();
        return new SaleParameter(saleParameter);
    }

    // Actualizar un parámetro de venta por ID
    static async update(id, data) {
        const affectedRows = await this.knex('saleparameters').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Sale parameter not found');
        }
        return await this.getById(id);
    }

    // Eliminar un parámetro de venta por ID
    static async delete(id) {
        const deletedSaleParameter = await this.knex('saleparameters').where('id', id).del();
        return deletedSaleParameter;
    }
}

module.exports = SaleParameter;
