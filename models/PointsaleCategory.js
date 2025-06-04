const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class PointsaleCategory {
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
        const categories = await this.knex('point_sale_categories').select();
        return categories.map(category => new PointsaleCategory(category));
    }

    static async getAllActive() {
        const categories = await this.knex('point_sale_categories').select()
        .where('active', true);
        return categories.map(category => new PointsaleCategory(category));
    }

    static async getById(id) {
        const category = await this.knex('point_sale_categories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new PointsaleCategory(category);
    }

    static async getByName(name) {
        const category = await this.knex('point_sale_categories').where('code_name', name).first();
        if (!category) {
            return null;
        }
        return new PointsaleCategory(category);
    }

    static async create(data) {
        const [id] = await this.knex('point_sale_categories').insert(data).returning('id');
        const category = await this.knex('point_sale_categories').where('id', id).first();
        return new PointsaleCategory(category);
    }

    static async update(id, data) {
        const affectedRows = await this.knex('point_sale_categories')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('BusinessCategory not found');
        }
        return await this.getById(id);
    }

}

module.exports = PointsaleCategory;