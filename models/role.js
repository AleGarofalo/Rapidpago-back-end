const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Role {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data. description;
    }
  
    static get knex() {
      return knex;
    }
  
    static async getAll() {
      const roles = await this.knex('roles').select();
      return roles;
    }
  
    static async getById(id) {
      const role = await this.knex('roles').where('id', id).first();
      if (!role) {
        return null;
      }
      return role;
    }
  
    static async getByName(rolename) {
      const role = await this.knex('roles').where('role', rolename).first();
      if (!role) {
        return null;
      }
      return role;
    }
  
    static async create(data) {
      const [role] = await this.knex('roles').insert(data);
      return role;
    }
  
    static async update(id, data) {
      const affectedRows = await this.knex('roles')
        .where('id', id)
        .update(data);
      if (affectedRows === 0) {
        throw new Error('Role not found');
      }
      return await this.getById(id); // Get the updated role
    }
    
    static async delete(id) {
      const deletedRole = await this.knex('roles').where('id', id).del();
      return deletedRole;
    }
}
  
  module.exports = Role;