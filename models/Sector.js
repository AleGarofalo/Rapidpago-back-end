const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Sector{

    constructor(data){
        this.id = data.id;
        this.sector = data.sector; 
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const sectors = await this.knex('sectors').select();
        return sectors.map(s => new Sector(s));
    }

    static async getAllActive() {
        const sectors = await this.knex('sectors').where('active',true).select();
        return sectors.map(s => new Sector(s));
    }

    static async getById(id) {
        const sector = await this.knex('sectors').where('id', id).first();
        if (!sector) {
            return null;
        }
        return new Sector(sector);
    }

    static async getBySector(sector) {
        const sectorcito = await this.knex('sectors').where('sector', sector).first();
        if (!sectorcito) {
            return null;
        }
        return new Sector(sectorcito);
    }

    static async create(data) {
        const [id] = await this.knex('sectors').insert(data);
        const user = await this.knex('sectors').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('sectors')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Sector not found');
        }
        return await this.getById(id);
    }

    static async delete(id) {
        const deletedsector = await this.knex('sectors').where('id', id).del();
        return deletedsector;
    }

}
module.exports = Sector;