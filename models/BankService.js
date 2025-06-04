const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class BankService{

    constructor(data){
        this.serviceID = data.serviceID;
        this.bankID = data.bankID;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex(){
        return knex;
    }

    static async getByKeys(serviceID,bankID){
        const bankservice = await this.knex('bank_services').where({serviceID,bankID});
        if(!bankservice){
            return null;
        }
        return new BankService(bankservice);
    }

    static async create(data) {
        const [serviceID] = await this.knex('bank_services').insert(data);
        const bank_service = await this.knex('bank_services').where('serviceID', serviceID).where('bankID', data.bankID).first();
        return new BankService(bank_service);
    }

    static async delete(serviceID, bankID) {
        const deletedRows = await this.knex('bank_services')
            .where('serviceID', serviceID)
            .where('bankID', bankID)
            .del();
    
        if (deletedRows) {
            return { message: `Deleted ${deletedRows} row(s) successfully.` };
        } else {
            throw new Error('No rows deleted');
        }
    } 

}

module.exports =BankService;