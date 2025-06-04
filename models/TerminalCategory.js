const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class TerminalCategory {
    constructor(data) {
        this.id = data.id;
        this.codeName = data.codeName;
        this.displayName = data.displayName;
        this.description = data.description;
        this.userID = data.userID;
        this.active = data.active;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const categories = await this.knex('terminal_categories').select();
        return categories.map(category => new TerminalCategory(category));
    }

    static async getAllActive() {
        const categories = await this.knex('terminal_categories').select()
        .where('active', true);
        return categories.map(category => new TerminalCategory(category));
    }

    static async getById(id) {
        const category = await this.knex('terminal_categories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new TerminalCategory(category);
    }

    static async getByname(name) {
        const category = await this.knex('terminal_categories').where('code_name', name).first();
        if (!category) {
            return null;
        }
        return new TerminalCategory(category);
    }

    static async create(data) {
        const [id] = await this.knex('terminal_categories').insert(data).returning('id');
        const category = await this.knex('terminal_categories').where('id', id).first();
        return new TerminalCategory(category);
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

}

module.exports = TerminalCategory;