const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Sale {
    constructor(data) {
        this.id = data.id;
        this.total_amount = data.total_amount;
        this.userID = data.userID;
        this.feetypeID = data.feetypeID;
        this.saleparameterID = data.saleparameterID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todas las ventas
    static async getAll() {
        const sales = await this.knex('sales').select();
        return sales.map(sale => new Sale(sale));
    }

    // Obtener una venta por ID
    static async getById(id) {
        const sale = await this.knex('sales').where('id', id).first();
        if (!sale) {
            return null;
        }
        return new Sale(sale);
    }

    // Crear una nueva venta
    static async create(data) {
        const [id] = await this.knex('sales').insert(data);
        const sale = await this.knex('sales').where('id', id).first();
        return new Sale(sale);
    }

    // Actualizar una venta por ID
    static async update(id, data) {
        const affectedRows = await this.knex('sales').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Sale not found');
        }
        return await this.getById(id);
    }

    // Eliminar una venta por ID
    static async delete(id) {
        const deletedSale = await this.knex('sales').where('id', id).del();
        return deletedSale;
    }
}

module.exports = Sale;
