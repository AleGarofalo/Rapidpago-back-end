const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Bank {
    constructor(data) {
      this._id = data.id;
      this.name = data.name;
      this.dni_type = data.dniType;
      this.dni = data.dni;
      this.code = data.code;
      this.display_name = data.displayName;
      this.alliance = data.alliance;
      this.domiciliation = data.domiciliation;
      this.partial_collection = data.partialCollection;
      this.centralized_collection = data.centralizedCollection;
      this.config = data.config;
      this.active = data.active;
      this.created_at = data.createdAt;
      this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
      const banks = await this.knex('banks').select();
      return banks.map(b => new Bank(b));
    }

    static async getDisplayNameById(id) {
    try {
        const bank = await this.knex('banks').where('id', id).first('display_name');
        if (!bank) {
          throw new Error('Bank not found');
        }
        return  new Bank(bank);
      } catch (error) {
        throw new Error(`Error al obtener el display_name del banco: ${error.message}`);
      }
    }

    static async getByActiveAndAliance() {
      const banks = await this.knex('banks').where('active', true).where('alliance', true).select('id', 'display_name', 'code');
      if (!banks) {
        return null;
      }
      return banks;
    }

    static async getServicesByBank(bankID) {
      const services = await this.knex('services')
        .select('services.*')
        .join('bank_services', 'services.id', 'bank_services.serviceID')
        .where('bank_services.bankID', bankID);
        return services.map(s => new Service(s));
    }


    static async getById(data) {
      const bank = await this.knex('banks').where('id', data.value || data).first();
      if (!bank) {
        return null;
      }
      return  new Bank(bank);
    }

    static async getByName(name) {
      const bank = await this.knex('banks').where('display_name', name).first();
      if (!bank) {
        return null;
      }
      return  new Bank(bank);
    }

    static async getAccountsByTerminal(id) {
      const banks = await this.knex('bankaccounts').where('terminalid', id).first();
      if (!banks) {
        return null;
      }
      return banks.map(b => new Bank(b));
    }

    static async create(data) {
      const [bank] = await this.knex('banks').insert(data);
      return bank;
    }

    static async update(id, data) {
      const affectedRows = await this.knex('banks')
        .where('id', id)
        .update(data);
      if (affectedRows === 0) {
        throw new Error('Bank not found');
      }
      return await this.getById(id); // Get the updated bank
    }

}

module.exports = Bank;