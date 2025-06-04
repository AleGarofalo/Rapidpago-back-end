const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Motive {

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

    // Obtener todos los motivos
    static async getAll() {
        const motives = await this.knex('motives').select();
        return motives.map(m => new Motive(m));
    }

    // Obtener todos los motivos activos
    static async getAllActive() {
        const motives = await this.knex('motives').where('active', true).select();
        return motives.map(m => new Motive(m));
    }

    // Obtener motivo por ID
    static async getById(id) {
        const motive = await this.knex('motives').where('id', id).first();
        if (!motive) {
            return null;
        }
        return new Motive(motive);
    }

    // Obtener motivo por descripción
    static async getByDescription(description) {
        const motive = await this.knex('motives').where('description', description).first();
        if (!motive) {
            return null;
        }
        return new Motive(motive);
    }

    // Crear un nuevo motivo
    static async create(data) {
        const [id] = await this.knex('motives').insert(data);
        const motive = await this.knex('motives').where('id', id).first();
        return new Motive(motive);
    }

    // Actualizar un motivo
    static async update(id, data) {
        const affectedRows = await this.knex('motives').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Motive not found');
        }
        return await this.getById(id);
    }

    // Eliminar un motivo
    static async delete(id) {
        const deletedMotive = await this.knex('motives').where('id', id).del();
        return deletedMotive;
    }
}

module.exports = Motive;
