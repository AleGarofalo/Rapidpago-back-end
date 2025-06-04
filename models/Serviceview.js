const bcrypt = require('bcrypt');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);
const moment = require('moment-timezone');

class Serviceview{
    constructor(data){
        this.id = data.id;
        this.service = data.service;
        this.description = data.description;
        this.active = data.active;
        this.ispos = data.ispos;
    }

    static get knex() {
        return knex;
    }

    static async getAllservices() {
        const services = await this.knex('services').select().where('deleted', false);
        return services.map(service => new Serviceview(service));
    } 

    static async getAllbyUser(id) {
        const services = await this.knex('services')
        .select()
        .leftJoin('services_settings', 'services.id', 'services_settings.serviceID')
        .where('services_settings.userID', '=', id)
        .andWhere('services.deleted', false);
        return services.map(service => new Serviceview(service));
    }
}

module.exports = Serviceview;