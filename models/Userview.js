const bcrypt = require('bcrypt');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);
const moment = require('moment-timezone');

class Userview {
    constructor(data) {
        this.id = data.id;
        this.userGUID = data.userGUID;
        this.username = data.username;
        this.password = data.password;
        this.password_expiration_days = data.password_expiration_days;
        this.password_expiration_date = data.password_expiration_date;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.dni_type = JSON.parse(data.dni_type);
        this.dni = data.dni;
        this.gender = JSON.parse(data.gender);
        this.birthdate = data.birthdate;
        this.email = data.email;
        this.phonecode = data.phonecode;
        this.phone = data.phone;
        this.address = JSON.parse(data.address);
        this.active = data.active;
        this.roleID = data.roleID;
        this.token = data.token;
        this.register_status = data.register_status;
        this.lastConnection = data.lastConnection;
    }

    static get knex() {
        return knex;
    }

    static async getAllusers() {
        const users = await this.knex('users').select().where('deleted', false);
        return users.map(user => new Userview(user));
    }

    static async getByGuid(userGUID) {
        const user = await this.knex('users').where('userGUID', userGUID).first();
        if (!user) {
            return null;
        }
        return new Userview(user);
    }
    
    static async getAllbyBusiness(id) {
        const users = await this.knex('users')
        .select()
        .leftJoin('users_businesses', 'users.id', 'users_businesses.userID')
        .where('users_businesses.business_entity_id', '=', id)
        .where('users.deleted', '=', false)
        .andWhere('users.deleted', false);
        return users.map(user => new Userview(user));
    }
}

module.exports= Userview;