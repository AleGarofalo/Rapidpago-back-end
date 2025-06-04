const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class PostalZone{

    constructor(data){
        this.id = data.id;
        this.postal_code = data.postal_code;
        this.town = data.town; 
        this.parishid = data.parishid; 
        this.parish = data.parish;
        this.userID = data.userID;
        this.active = data.active;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const postalzones = await this.knex('postal_zones')
        .join('parishes', 'postal_zones.parishid', 'parishes.id')  // Une las tablas usando la clave foránea stateid
        .select('postal_zones.*', 'parishes.parish');
        return postalzones.map(p => new PostalZone(p));
    }

    static async getAllActive() {
        const postalzones = await this.knex('postal_zones')
        .where('postal_zones.active',true)
        .join('parishes', 'postal_zones.parishid', 'parishes.id')  // Une las tablas usando la clave foránea stateid
        .select('postal_zones.*', 'parishes.parish');
        return postalzones.map(p => new PostalZone(p));
    }

    static async getById(id) {
        const postalzone = await this.knex('postal_zones')
        .join('parishes', 'postal_zones.parishid', 'parishes.id')
        .where('postal_zones.id', id)   // Une las tablas usando la clave foránea stateid
        .select('postal_zones.*', 'parishes.parish')
        .first();
        if (!postalzone) {
            return null;
        }
        return new PostalZone(postalzone);
    }

    static async getByName(postal_code) {
        const postalzone = await this.knex('postal_zones').where('postal_code', postal_code).first();
        if (!postalzone) {
            return null;
        }
        return new PostalZone(postalzone);
    }

    static async getAllbyParish(parishid) {
        const postalzones = await this.knex('postal_zones')
        .where('parishid', '=',parishid)
        .select();
        return postalzones.map(p => new PostalZone(p));
    }

    static async create(data) {
        const [id] = await this.knex('postal_zones').insert(data);
        const user = await this.knex('postal_zones').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('postal_zones')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Postal zone not found');
        }
        return await this.getById(id);
    }

}
module.exports = PostalZone;