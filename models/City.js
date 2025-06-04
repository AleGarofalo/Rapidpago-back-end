const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class City{
    constructor(data){
        this.id = data.id;
        this.city = data.city;
        this.capital = data.capital;
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

    static async getAllActive() {
        const cities = await this.knex('cities')
        .where('cities.active',true)
        .join('states', 'cities.stateid', 'states.id')  // Une las tablas usando la clave foránea stateid
        .select('cities.*', 'states.state');  // Selecciona todos los campos de cities y solo el campo state de states
        return cities.map(c => new City(c));
    }

    static async getAll() {
        const cities = await this.knex('cities')
        .join('states', 'cities.stateid', 'states.id')  // Une las tablas usando la clave foránea stateid
        .select('cities.*', 'states.state');  // Selecciona todos los campos de cities y solo el campo state de states
        return cities.map(c => new City(c));
    }

    static async getById(id) {
        const city = await this.knex('cities')
        .join('states', 'cities.stateid', 'states.id')
        .where('cities.id', id)   // Une las tablas usando la clave foránea stateid
        .select('cities.*', 'states.state')
        .first();
        if (!city) {
            return null;
        }
        return new City(city);
    }

    static async getByName(city) {
        const thecity = await this.knex('cities').where('city', city).first();
        if (!thecity) {
            return null;
        }
        return new City(thecity);
    }

    static async getAllbyState(stateid) {
        const cities = await this.knex('cities')
        .where('stateid', '=',stateid)
        .select();
        return cities.map(c => new City(c));
    }

    static async create(data) {
        const [id] = await this.knex('cities').insert(data);
        const user = await this.knex('cities').where('id', id).first();
        return user;
    }
  
    static async update(id, data) {
        const affectedRows = await this.knex('cities')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('City not found');
        }
        return await this.getById(id);
    }

    static async delete(id) {
        const deletedcity = await this.knex('cities').where('id', id).del();
        return deletedcity;
    }
}

module.exports = City;