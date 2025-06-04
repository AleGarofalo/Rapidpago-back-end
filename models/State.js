const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class State{
    constructor(data){
        this.id = data.id;
        this.state = data.state;
        this.iso_3166_2 = data.iso_3166_2;
        this.countryid = data.countryid;
        this.country = data.country;
        this.userID = data.userID;
        this.active = data.active;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const states = await this.knex('states')
        .select('states.*', 'countries.country')  // Selecciona todas las columnas de states y el atributo country de countries
        .join('countries', 'states.countryid', 'countries.id');  // Une las tablas usando la clave foránea countryid
        return states.map(s => new State(s));
    }

    static async getAllActive() {
        const states = await this.knex('states')
        .where('states.active',true)
        .select('states.*', 'countries.country')  // Selecciona todas las columnas de states y el atributo country de countries
        .join('countries', 'states.countryid', 'countries.id');  // Une las tablas usando la clave foránea countryid
        return states.map(s => new State(s));
    }

    static async getById(id) {
        const stateWithCountry = await this.knex('states')
        .join('countries', 'states.countryid', 'countries.id')  // Une las tablas usando la clave foránea countryid
        .where('states.id', id)  // Filtra por el id del estado específico
        .select('states.*', 'countries.country')  // Selecciona todos los campos de states y solo el campo country de countries
        .first();  // Obtén el primer resultado
        if (!stateWithCountry) {
            return null;
        }
        return new State(stateWithCountry);
    }

    static async getByName(state) {
        const thestate = await this.knex('states').where('state', state).first();
        if (!thestate) {
            return null;
        }
        return new State(thestate);
    }

    static async getAllbyCountry(countryid) {
        const states = await this.knex('states')
        .where('countryid', '=',countryid)
        .select();
        return states.map(s => new State(s));
    }

    static async create(data) {
        const [id] = await this.knex('states').insert(data);
        const user = await this.knex('states').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('states')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('State not found');
        }
        return await this.getById(id);
    }

    static async delete(id) {
        const deletedstate = await this.knex('states').where('id', id).del();
        return deletedstate;
    }

}

module.exports = State;