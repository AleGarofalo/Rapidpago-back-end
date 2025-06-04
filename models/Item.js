const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Item {
    constructor(data) {
        this.id = data.id;
        this.serial = data.serial;
        this.modelID = data.modelID;
        this.model = data.model;
        this.userID = data.userID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los ítems
    static async getAll() {
        const items = await this.knex('items').select()
        .join('models', 'items.modelID', 'models.id')
        .select('items.*', 'models.name'); 
        return items.map(item => new Item(item));
    }

    // Obtener un ítem por ID
    static async getById(id) {
        const item = await this.knex('items').where('id', id).first();
        if (!item) {
            return null;
        }
        return new Item(item);
    }

    // Crear un nuevo ítem
    static async create(data) {
        const [id] = await this.knex('items').insert(data);
        const item = await this.knex('items').where('id', id).first();
        return new Item(item);
    }

    // Actualizar un ítem por ID
    static async update(id, data) {
        const affectedRows = await this.knex('items').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Item not found');
        }
        return await this.getById(id);
    }

    // Eliminar un ítem por ID
    static async delete(id) {
        const deletedItem = await this.knex('items').where('id', id).del();
        return deletedItem;
    }
}

module.exports = Item;
