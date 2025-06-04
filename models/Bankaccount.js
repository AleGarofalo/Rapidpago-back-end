const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Bankaccount{
    constructor(data) {
        this.id = data.id;
        this.merchant_id_code = data.merchant_id_code;
        this.account_number = data.account_number;
        this.bank_id = data.bank_id;
        this.bank_name = data.bank_name;
        this.business_entity_id = data.business_entity_id;
        this.terminalid = data.terminalid;
        this.active = data.active;
        this.deleted = data.deleted;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex(){
      return knex;
    }

    static async getByTerminal(id){
        const accounts = await this.knex('bankaccounts as ba')
        .join('banks as b', 'b.id', 'ba.bank_id')
        .where('ba.terminalid', id)
        .select('ba.*','b.name as bank_name');;
        if (!accounts) {
          return null;
        }
        return accounts.map(a => new Bankaccount(a));
    }

    static async getByBusiness(id){
        const accounts = await this.knex('bankaccounts as ba')
        .join('banks as b', 'b.id', 'ba.bank_id')
        .where('ba.business_entity_id', id)
        .select('ba.*','b.name as bank_name');
        if (!accounts){
          return null;
        }
        return accounts.map(a => new Bankaccount(a));
    }
}

module.exports =Bankaccount;