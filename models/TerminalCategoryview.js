const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class TerminalviewCategory {
    constructor(data) {
        this.id = data.id;
        this.codeName = data.code_name;
        this.displayName = data.display_name;
        this.description = data.description;
        this.active = data.active;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const categories = await this.knex('terminal_categories').select();
        return categories.map(category => new TerminalviewCategory(category));
    }

    static async getAllactive() {
        const categories = await this.knex('terminal_categories').select()
        .where('active',true)
        return categories.map(category => new TerminalviewCategory(category));
    }

    static async getById(id) {
        const category = await this.knex('terminal_categories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new TerminalviewCategory(category);
    }

    static async create(data) {
        const [id] = await this.knex('terminal_categories').insert(data).returning('id');
        const category = await this.knex('terminal_categories').where('id', id).first();
        return new TerminalviewCategory(category);
    }

    static async update(id, data) {
        const affectedRows = await this.knex('terminal_categories')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('BusinessCategory not found');
        }
        return await this.getById(id);
    }

    /*
    static async delete(id) {
        const affectedRows = await this.knex('businesscategories')
            .where('id', id)
            .delete();
        if (affectedRows === 0) {
            throw new Error('BusinessCategory not found');
        }
        return true;
    }
    */
}

module.exports = TerminalviewCategory;