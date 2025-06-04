const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Model {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.brand = data.brand;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los modelos
    static async getAll() {
        const models = await this.knex('models').select();
        return models.map(model => new Model(model));
    }

    // Obtener todos los modelos activos
    static async getAllActive() {
        const models = await this.knex('models').where('active', true).select();
        return models.map(model => new Model(model));
    }

    // Obtener un modelo por ID
    static async getById(id) {
        const model = await this.knex('models').where('id', id).first();
        if (!model) {
            return null;
        }
        return new Model(model);
    }

    // Obtener un modelo por nombre
    static async getByName(name) {
        const model = await this.knex('models').where('name', name).first();
        if (!model) {
            return null;
        }
        return new Model(model);
    }

    // Crear un nuevo modelo
    static async create(data) {
        const [id] = await this.knex('models').insert(data);
        const model = await this.knex('models').where('id', id).first();
        return new Model(model);
    }

    // Actualizar un modelo por ID
    static async update(id, data) {
        const affectedRows = await this.knex('models').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Model not found');
        }
        return await this.getById(id);
    }

    // Eliminar un modelo por ID
    static async delete(id) {
        const deletedModel = await this.knex('models').where('id', id).del();
        return deletedModel;
    }
}

module.exports = Model;
