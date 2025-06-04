const bcrypt = require("bcrypt");
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);
const moment = require("moment-timezone");

class User {
  constructor(data) {
    this.id = data.id;
    this.userGUID = data.userGUID;
    this.username = data.username;
    this.passwordExpirationDays = data.password_expiration_days;
    this.passwordExpirationDate = data.password_expiration_date;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.dniType = data.dni_type;
    this.dni = data.dni;
    this.birthdate = data.birthdate;
    this.gender = data.gender;
    this.email = data.email;
    this.phonecode = data.phonecode;
    this.phone = data.phone;
    this.password = data.password;
    this.address = data.address;
    this.active = data.active;
    this.deleted = data.deleted;
    this.roleId = data.role_id;
    this.firstSession = data.first_session;
    this.lastConnection = data.last_connection;
    this.register_status = data.register_status;
    this.token = data.token;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  static async getAllusers() {
    const users = await this.knex("users").select().where("deleted", false);
    return users.map((user) => new User(user));
  }

  static async getById(id) {
    const user = await this.knex("users").where("id", id).first();
    if (!user) {
      return null;
    }
    return new User(user);
  }

  static async getByuserGUID(userGUID) {
    const user = await this.knex("users").where("userGUID", userGUID).first();
    if (!user) {
      return null;
    }
    return new User(user);
  }

  static async getByUsername(username) {
    const user = await this.knex("users").where("username", username).first();
    if (!user) {
      return null;
    }
    return new User(user);
  }

  static async getByEmail(email) {
    const user = await this.knex("users").where("email", email).first();
    if (!user) {
      return null;
    }
    return new User(user);
  }

  static async create(data) {
    const [id] = await this.knex("users").insert(data);
    const user = await this.knex("users").where("id", id).first();
    return user;
  }

  static async update(id, data) {
    const affectedRows = await this.knex("users").where("id", id).update(data);
    if (affectedRows === 0) {
      throw new Error("User not found");
    }
    return await this.getById(id);
  }

  static async updateUserPhone(userId, newPhone) {
    try {
      // Actualiza el campo 'phone' del usuario con el ID especificado
      await User.update(userId, {
        phone: newPhone,
        update_at: moment().tz("America/Caracas").format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (error) {
      console.error(
        "Error al actualizar el número de teléfono del usuario:",
        error.message
      );
    }
  }

  static async updateActiveStatus(id, isActive) {
    const affectedRows = await this.knex("users")
      .where("id", id)
      .update({ active: isActive });
    if (affectedRows === 0) {
      throw new Error("User not found");
    }
    return await this.getById(id);
  }

  verifyPassword(password) {
    return password === this.password;
  }
}

module.exports = User;
