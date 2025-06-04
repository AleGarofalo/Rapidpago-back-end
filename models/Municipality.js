const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Municipality{

    constructor(data){
        this.id = data.id;
        this.municipality = data.municipality;
        this.stateid = data.stateid; 
        this.state = data.state;
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const municipalities = await this.knex('municipalities')
        .join('states', 'municipalities.stateid', 'states.id')  // Une las tablas usando la clave foránea stateid
        .select('municipalities.*', 'states.state');
        return municipalities.map(m => new Municipality(m));
    }

    static async getAllActive() {
        const municipalities = await this.knex('municipalities')
        .where('municipalities.active',true)
        .join('states', 'municipalities.stateid', 'states.id')  // Une las tablas usando la clave foránea stateid
        .select('municipalities.*', 'states.state');
        return municipalities.map(m => new Municipality(m));
    }

    static async getById(id) {
        const municipality = await this.knex('municipalities')
        .join('states', 'municipalities.stateid', 'states.id')
        .where('municipalities.id', id)   // Une las tablas usando la clave foránea stateid
        .select('municipalities.*', 'states.state')
        .first();
        if (!municipality) {
            return null;
        }
        return new Municipality(municipality);
    }

    static async getByName(municipality) {
        const themunicipality = await this.knex('municipalities').where('municipality', municipality).first();
        if (!themunicipality) {
            return null;
        }
        return new Municipality(themunicipality);
    }


    static async getAllbyState(stateid) {
        const municipalities = await this.knex('municipalities')
        .where('stateid', '=',stateid)
        .select();
        return municipalities.map(m => new Municipality(m));
    }

    static async create(data) {
        const [id] = await this.knex('municipalities').insert(data);
        const user = await this.knex('municipalities').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('municipalities')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Municipality not found');
        }
        return await this.getById(id);
    }

}
module.exports = Municipality;