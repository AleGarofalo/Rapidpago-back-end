const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class PointsaleCategoryview {
    constructor(data) {
        this.id = data.id;
        this.code_name = data.code_name;
        this.display_name = data.display_name;
        this.description = data.description;
        this.active = data.active;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const categories = await this.knex('point_sale_categories').select();
        return categories.map(category => new PointsaleCategoryview(category));
    }

    static async getById(id) {
        const category = await this.knex('point_sale_categories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new PointsaleCategory(category);
    }

    static async create(data) {
        const [id] = await this.knex('point_sale_categories').insert(data).returning('id');
        const category = await this.knex('point_sale_categories').where('id', id).first();
        return new PointsaleCategoryview(category);
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

module.exports = PointsaleCategoryview;