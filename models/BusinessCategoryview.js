const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class BusinessCategoryview {
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
        const categories = await this.knex('businesscategories').select();
        return categories.map(category => new BusinessCategoryview(category));
    }

    static async getAllactive() {
        const categories = await this.knex('businesscategories').select()
        .where('active', true);
        return categories.map(category => new BusinessCategoryview(category));
    }

    static async getById(id) {
        const category = await this.knex('businesscategories').where('id', id).first();
        if (!category) {
            return null;
        }
        return new BusinessCategoryview(category);
    }

}

module.exports = BusinessCategoryview;