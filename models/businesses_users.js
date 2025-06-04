const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class businesses_users {

    constructor(data) {
        this.userID = data.userID;
        this.business_entity_id = data.business_entity_id;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const businesses_users = await this.knex('users_businesses').select();
        return businesses_users.map(business_user => new businesses_users(business_user));
    }

    static async getByuserId(id) {
        const user = await this.knex('users_businesses').where('userID', id).first();
        if (!user) {
          return null;
        }
        return user;
    }

    static async getBybusinessId(id) {
        const business = await this.knex('users_businesses').where('business_entity_id', id).first();
        if (!business) {
            return null;
        }
        return business;
    }

    static async create(data) {
        const [userID] = await this.knex('users_businesses').insert(data);
        const user_business = await this.knex('users_businesses').where('userID', userID).where('business_entity_id', data.business_entity_id).first();
        return user_business;
    }
}

module.exports = businesses_users;