const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);
const ServiceSettings = require('../models/ServiceSettings');
const TerminalService = require('../models/TerminalService');
const BankService = require('../models/BankService');

class Service {
    constructor(data) {
      this.id = data.id;
      this.service = data.service;
      this.description = data.description;
      this.active = data.active;
      this.deleted = data.deleted;
      this.ispos = data.ispos;
      this.costo_dolares = data.costo_dolares;
      this.createdAt = data.created_at;
      this.updatedAt = data.updated_at;
    }
  
    static get knex() {
      return knex;
    }
  
    static async getAll() {
      const services = await this.knex('services').select();
      return services;
    }
  
    static async getById(id) {
      const service = await this.knex('services').where('id', id).first();
      if (!service) {
        return null;
      }
      return new Service(service);
    }
  
    static async getServiceUser(userID, serviceID, terminalID,bankID){ 
        const service_user= await this.knex('services_settings')
        .where('serviceID', serviceID)
        .where('userID', userID)
        .where('terminalID', terminalID)
        .where('bankID', bankID)
        .first();
        if(!service_user){
            return null;
        }
        return new ServiceSettings(service_user);
    }

    static async getServiceTerminal(terminalID,serviceID){
      const terminal_service= await this.knex('terminals_services').where('terminalID',terminalID).andWhere('serviceID', serviceID).first();
      if(!terminal_service){
          return null;
      }
      return new TerminalService(terminal_service);
    }

    static async getServiceBank(bankID,serviceID){
      const bank_service= await this.knex('bank_services').where('serviceID',serviceID).andWhere('bankID', bankID).first();
      if(!bank_service){
          return null;
      }
      return new BankService(bank_service);
    }

    static async getServicesInCommon(terminalID,bankID){
      const services= await knex('terminals_services as ts')
      .join('services as s', 'ts.serviceID', 's.id')
      .join('bank_services as bs', 's.id', 'bs.serviceID')
      .where('ts.terminalID', terminalID)
      .where('bs.bankID', bankID)
      .select('s.*');
      if(!services){
          return null;
      }
      return services;
    }

    static async getServicesByUser(userID){
      const servicebyuser= await this.knex('services_settings').where('userID',userID);
      if(!servicebyuser){
          return null;
      }
      return servicebyuser.map(service => new ServiceSettings(service));
  }

    static async getByName(serviceName) {
      const service = await this.knex('services').where('service', serviceName).first();
      if (!service) {
        return null;
      }
      return new Service(service);
    }
  
    static async create(data) {
      const [service] = await this.knex('services').insert(data);
      return service;
    }
  
    static async update(id, data) {
      const affectedRows = await this.knex('services')
        .where('id', id)
        .update(data);
      if (affectedRows === 0) {
        throw new Error('Service not found');
      }
      return await this.getById(id); // Get the updated service
    }

    static async updateActiveStatus(id, isActive){
        const affectedRows = await this.knex('services')
            .where('id', id)
            .update({ active: isActive });
        if (affectedRows === 0) {
            throw new Error('Servicio no encontrado');
        }
        return await this.getById(id);
    }

    static async asigntoTerminal(data){
      const [serviceassigned] = await this.knex('terminals_services').insert(data);
      return serviceassigned;
    }

    static async unasigntoTerminal(data){
        const affectedRows = await this.knex('terminals_services')
        .where('terminalID', data.terminalID)
        .andWhere('serviceID', data.serviceID)
        .delete();
        if (affectedRows === 0) {
            throw new Error('asignation not found');
        }
            return true;
    }

    static async asigntoBank(data){
      const [serviceassigned] = await this.knex('bank_services').insert(data);
      return serviceassigned;
    }

    static async unasigntoBank(data){
      const affectedRows = await this.knex('bank_services')
      .where('serviceID', data.serviceID)
      .andWhere('bankID', data.bankID)
      .delete();
      if (affectedRows === 0) {
          throw new Error('asignation not found');
      }
          return true;
  }

    static async asigntoUser(data){
      const [serviceassigned] = await this.knex('services_settings').insert(data);
      return serviceassigned;
  }

    static async unasingtoUser(data){
        const affectedRows = await this.knex('services_settings')
        .where('id', data.id)
        .andWhere('userID', data.userID)
        .andWhere('serviceID', data.serviceID)
        .andWhere('terminalID', data.terminalID)
        .andWhere('bankID', data.bankID)
        .delete();
        if (affectedRows === 0) {
            throw new Error('Bank not found');
        }
            return true;
    }
}
  
module.exports = Service;