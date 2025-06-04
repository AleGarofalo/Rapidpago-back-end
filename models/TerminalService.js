const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class TerminalService{

    constructor(data){
        this.terminalID = data.terminalID,
        this.serviceID = data.serviceID,
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static get knex() {
        return knex;
    }

}

module.exports = TerminalService;