const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);
const moment = require('moment-timezone');

class Validation {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.validation_type_id = data.validation_type_id;
    this.validated = data.validated;
    this.validation_date = data.validation_date;
    this.token = data.token;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  static async getByUserIdAndTypeId(userId, typeId) {
    try {
      const validation = await this.knex('validations')
        .where({ user_id: userId, validation_type_id: typeId })
        .first();
      return validation ? new Validation(validation) : null;
    } catch (error) {
      throw new Error(`Error fetching validation by user id and type id: ${error.message}`);
    }
  }

  static async updateToken(validationId, newToken) {
    try {
      await knex('validations')
        .where('id', validationId)
        .update({ token: newToken, updated_at: moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss') });

        return true; // Devuelve true si la actualización tiene éxito
    } catch (error) {
      console.error('Error al actualizar el token de validación:', error);
      throw new Error('Error al actualizar el token de validación');
    }
  }

  static async updateValidated(validationId) {
    try {
      await knex('validations')
        .where('id', validationId)
        .update({ validated: true, updated_at: moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss') });

        return true; // Devuelve true si la actualización tiene éxito
    } catch (error) {
      console.error('Error al actualizar el token de validación:', error);
      throw new Error('Error al actualizar el token de validación');
    }
  }

  static async create(data) {
    try {
      const [id] = await this.knex('validations').insert(data);
      const validation = await this.knex('validations').where('id', id).first();
      return new Validation(validation);
    } catch (error) {
      throw new Error(`Error creating validation: ${error.message}`);
    }
  }
}

module.exports = Validation;