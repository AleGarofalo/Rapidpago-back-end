const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class ServiceSettings{
    constructor(data) {
        this.id = data.id;
        this.serviceID = data.serviceID;
        this.userID = data.userID;
        this.terminalID = data.terminalID;
        this.bankID = data.bankID;
        this.settings = data.settings;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const settings = await this.knex('service_settings').select();
        return settings.map(setting => new ServiceSetting(setting));
    }

    static async getById(id) {
        const setting = await this.knex('service_settings').where('id', id).first();
        if (!setting) {
            return null;
        }
        return new ServiceSetting(setting);
    }

    static async getByServiceAndUser(serviceID, userID,terminalID,bankID) {
        const setting = await this.knex('service_settings').where({ serviceID, userID, terminalID, bankID}).first();
        if (!setting) {
            return null;
        }
        return new ServiceSetting(setting);
    }

    static async create(data) {
        const [id] = await this.knex('service_settings').insert(data).returning('id');
        const setting = await this.knex('service_settings').where('id', id).first();
        return new ServiceSetting(setting);
    }

    static async update(id, data) {
        const setingsData = this.transformToJson(data);
        const affectedRows = await this.knex('service_settings')
            .where('id', id)
            .update(setingsData);
        if (affectedRows === 0) {
            throw new Error('ServiceSetting not found');
        }
        return await this.getById(id);
    }

    static transformToJson(data) {
        const transformedData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object' && data[key] !== null) {
                    transformedData[key] = JSON.stringify(data[key]);
                } else {
                    transformedData[key] = data[key];
                }
            }
        }
        return transformedData;
    }

    static async delete(id) {
        const affectedRows = await this.knex('service_settings')
            .where('id', id)
            .delete();
        if (affectedRows === 0) {
            throw new Error('ServiceSetting not found');
        }
        return true;
    }
}
module.exports =ServiceSettings;