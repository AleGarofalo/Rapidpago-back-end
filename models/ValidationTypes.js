const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class ValidationType {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.active = data.active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  static async getAll() {
    try {
      const validationTypes = await this.knex('validation_types').select('*');
      return validationTypes.map(data => new ValidationType(data));
    } catch (error) {
      throw new Error(`Error fetching validation types: ${error.message}`);
    }
  }
}

module.exports = ValidationType;