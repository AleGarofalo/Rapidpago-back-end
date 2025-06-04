const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Parish{

    constructor(data){
        this.id = data.id;
        this.parish = data.parish;
        this.municipalityid = data.municipalityid; 
        this.municipality = data.municipality;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const parishes = await this.knex('parishes')
        .join('municipalities', 'parishes.municipalityid', 'municipalities.id')  // Une las tablas usando la clave foránea stateid
        .select('parishes.*', 'municipalities.municipality');
        return parishes.map(p => new Parish(p));
    }

    static async getAllActive() {
        const parishes = await this.knex('parishes')
        .where('parishes.active',true)
        .join('municipalities', 'parishes.municipalityid', 'municipalities.id')  // Une las tablas usando la clave foránea stateid
        .select('parishes.*', 'municipalities.municipality');
        return parishes.map(p => new Parish(p));
    }

    static async getById(id) {
        const parish = await this.knex('parishes')
        .join('municipalities', 'parishes.municipalityid', 'municipalities.id')
        .where('parishes.id', id)   // Une las tablas usando la clave foránea stateid
        .select('parishes.*', 'municipalities.municipality')
        .first();
        if (!parish) {
            return null;
        }
        return new Parish(parish);
    }

    static async getByName(parish) {
        const theparish = await this.knex('parishes').where('parish', parish).first();
        if (!theparish) {
            return null;
        }
        return new Parish(theparish);
    }

    static async getAllbyMunicipality(municipalityid) {
        const parishes = await this.knex('parishes')
        .where('municipalityid', '=',municipalityid)
        .select();
        return parishes.map(p => new Parish(p));
    }

    static async create(data) {
        const [id] = await this.knex('parishes').insert(data);
        const user = await this.knex('parishes').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('parishes')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Parish not found');
        }
        return await this.getById(id);
    }

}
module.exports = Parish;