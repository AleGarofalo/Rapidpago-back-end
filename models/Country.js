const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Country {

    constructor(data){
        this.id = data.id;
        this.country = data.country;
        this.iso_3166_1 = data.iso_3166_1;
        this.iso_3166_2 = data.iso_3166_2; 
        this.iso_3166_num = data.iso_3166_num;
        this.userID = data.userID;
        this.active = data.active;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const countries = await this.knex('countries').select();
        return countries.map(c => new Country(c));
    }

    static async getAllActive() {
        const countries = await this.knex('countries').where('active',true).select();
        return countries.map(c => new Country(c));
    }

    static async getById(id) {
        const country = await this.knex('countries').where('id', id).first();
        if (!country) {
            return null;
        }
        return new Country(country);
    }

    static async getByName(name) {
        const country = await this.knex('countries').where('country', name).first();
        if (!country) {
            return null;
        }
        return new Country(country);
    }

    static async create(data) {
        const [id] = await this.knex('countries').insert(data);
        const user = await this.knex('countries').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('countries')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Country not found');
        }
        return await this.getById(id);
    }

    static async delete(id) {
        const deletedcountry = await this.knex('countries').where('id', id).del();
        return deletedcountry;
    }

}

module.exports = Country;