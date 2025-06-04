const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Terminal{

    constructor(data) {
        this.id = data.id;
        this.t_guid = data.t_guid;
        this.name = data.name;
        this.description = data.description;
        this.app_param = JSON.parse(data.app_param);
        this.fee = data.fee;
        this.terminal_category_id = data.terminal_category_id;
        // this.account_bank_id = data.account_bank_id; // Comentado
        // this.business_entity_id = data.business_entity_id; // Comentado
        this.point_sale_id = data.point_sale_id;
        this.association_date = data.association_date;
        this.active = data.active;
        this.deleted = data.deleted;
        this.created_at = data.created_at ;
        this.updated_at = data.updated_at ;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const terminal = await this.knex('terminal_entities').select();
        return terminal.map(t => new Terminal(t));
    }

    static async getById(id) {
        const terminal = await this.knex('terminal_entities').where('id', id).first();
        if (!terminal) {
            return null;
        }
        return new Terminal(terminal);
    }

    static async getByName(name) {
        const terminal = await this.knex('terminal_entities').where('name', name).first();
        if (!terminal) {
            return null;
        }
        return new Terminal(terminal);
    }

    static async getByGUID(GUID) {
        const terminal = await this.knex('terminal_entities').where('t_guid', GUID).first();
        if (!terminal) {
            return null;
        }
        return new Terminal(terminal);
    }

    static async getByPOS(id){
        const terminal = await this.knex('terminal_entities').select().where('point_sale_id', id);
        return terminal.map(t => new Terminal(t));
    }

    static async getByCategory(id){
        const terminal = await this.knex('terminal_entities').select().where('terminal_category_id', id);
        return terminal.map(t => new Terminal(t));
    }

    static async getByService(serviceID){
        const terminal = await this.knex('terminal_entities')
        .select('terminal_entities.*')
        .join('terminals_services', 'terminal_entities.id', 'terminals_services.terminalID')
        .where('terminals_services.serviceID', serviceID);
        return terminal.map(t => new Terminal(t));
    }

    static async getServicesByTerminal(terminalID){
        const terminal = await this.knex('services')
        .select('services.*')
        .join('terminals_services', 'services.id', 'terminals_services.serviceID')
        .where('terminals_services.terminalID', terminalID);
        return terminal.map(t => new Terminal(t));
    }

    static async create(data) {
        const [id] = await this.knex('terminal_entities').insert(data).returning('id');
        const terminal = await this.knex('terminal_entities').where('id', id).first();
        return new Terminal(terminal);
    }

    static async update(id, data) {
        const terminalData = this.transformToJson(data);
        const affectedRows = await this.knex('terminal_entities')
            .where('id', id)
            .update(terminalData);
        if (affectedRows === 0) {
            throw new Error('PointOfSale not found');
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

}

module.exports =Terminal;