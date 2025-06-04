const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class FeeType {

    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.amount = data.amount;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los tipos de tarifas
    static async getAll() {
        const feeTypes = await this.knex('feetypes').select();
        return feeTypes.map(ft => new FeeType(ft));
    }

    // Obtener todos los tipos de tarifas activas
    static async getAllActive() {
        const feeTypes = await this.knex('feetypes').where('active', true).select();
        return feeTypes.map(ft => new FeeType(ft));
    }

    // Obtener tipo de tarifa por ID
    static async getById(id) {
        const feeType = await this.knex('feetypes').where('id', id).first();
        if (!feeType) {
            return null;
        }
        return new FeeType(feeType);
    }

    // Obtener tipo de tarifa por descripción
    static async getByDescription(description) {
        const feeType = await this.knex('feetypes').where('description', description).first();
        if (!feeType) {
            return null;
        }
        return new FeeType(feeType);
    }

    // Crear un nuevo tipo de tarifa
    static async create(data) {
        const [id] = await this.knex('feetypes').insert(data);
        const feeType = await this.knex('feetypes').where('id', id).first();
        return new FeeType(feeType);
    }

    // Actualizar un tipo de tarifa
    static async update(id, data) {
        const affectedRows = await this.knex('feetypes').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('FeeType not found');
        }
        return await this.getById(id);
    }

    // Eliminar un tipo de tarifa
    static async delete(id) {
        const deletedFeeType = await this.knex('feetypes').where('id', id).del();
        return deletedFeeType;
    }
}

module.exports = FeeType;
