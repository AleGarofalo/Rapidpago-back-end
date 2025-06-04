const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class PaymentType {

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

    // Obtener todos los tipos de pago
    static async getAll() {
        const paymentTypes = await this.knex('paymenttypes').select();
        return paymentTypes.map(pt => new PaymentType(pt));
    }

    // Obtener todos los tipos de pago activos
    static async getAllActive() {
        const paymentTypes = await this.knex('paymenttypes').where('active', true).select();
        return paymentTypes.map(pt => new PaymentType(pt));
    }

    // Obtener tipo de pago por ID
    static async getById(id) {
        const paymentType = await this.knex('paymenttypes').where('id', id).first();
        if (!paymentType) {
            return null;
        }
        return new PaymentType(paymentType);
    }

    // Obtener tipo de pago por descripción
    static async getByDescription(description) {
        const paymentType = await this.knex('paymenttypes').where('description', description).first();
        if (!paymentType) {
            return null;
        }
        return new PaymentType(paymentType);
    }

    // Crear un nuevo tipo de pago
    static async create(data) {
        const [id] = await this.knex('paymenttypes').insert(data);
        const paymentType = await this.knex('paymenttypes').where('id', id).first();
        return new PaymentType(paymentType);
    }

    // Actualizar un tipo de pago
    static async update(id, data) {
        const affectedRows = await this.knex('paymenttypes').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('PaymentType not found');
        }
        return await this.getById(id);
    }

    // Eliminar un tipo de pago
    static async delete(id) {
        const deletedPaymentType = await this.knex('paymenttypes').where('id', id).del();
        return deletedPaymentType;
    }
}

module.exports = PaymentType;
