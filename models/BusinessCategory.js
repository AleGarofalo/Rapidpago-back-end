const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class BusinessCategory {
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
        const categories = await this.knex('businesscategories').select();
        return categories.map(category => new BusinessCategory(category));
    }

    static async getAllactive() {
        const categories = await this.knex('businesscategories').select()
        .where('active', true);
        return categories.map(category => new BusinessCategory(category));
    }

    static async getById(id) {
        const category = await this.knex('businesscategories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new BusinessCategory(category);
    }

    static async getByName(name) {
        const category = await this.knex('businesscategories').where('code_name', name).first();
        if (!category) {
            return null;
        }
        return new BusinessCategory(category);
    }

    static async create(data) {
        const [id] = await this.knex('businesscategories').insert(data).returning('id');
        const category = await this.knex('businesscategories').where('id', id).first();
        return new BusinessCategory(category);
    }

    static async update(id, data) {
        const affectedRows = await this.knex('businesscategories')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('BusinessCategory not found');
        }
        return await this.getById(id);
    }
}

module.exports = BusinessCategory;