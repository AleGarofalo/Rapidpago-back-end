const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class BasePath {
  constructor(data) {
    this.id = data.id;
    this.ruta_base = data.ruta_base;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  // Obtener todos los registros
  static async getAll() {
    const basePaths = await this.knex("basePath").select();
    return basePaths.map((basePath) => new BasePath(basePath));
  }

  // Obtener un registro por ID
  static async getById(id) {
    const basePath = await this.knex("basePath").where("id", id).first();
    if (!basePath) {
      return null;
    }
    return new BasePath(basePath);
  }

  // Crear un nuevo registro
  static async create(data) {
    const [id] = await this.knex("basePath").insert(data);
    const basePath = await this.knex("basePath").where("id", id).first();
    return new BasePath(basePath);
  }

  // Actualizar un registro por ID
  static async update(id, data) {
    const affectedRows = await this.knex("basePath")
      .where("id", id)
      .update(data);
    if (affectedRows === 0) {
      throw new Error("BasePath not found");
    }
    return await this.getById(id);
  }

  // Eliminar un registro por ID
  static async delete(id) {
    const deletedBasePath = await this.knex("basePath").where("id", id).del();
    return deletedBasePath;
  }

  // Obtener el registro activo (si necesitas uno específico)
  static async getActive() {
    const activeBasePath = await this.knex("basePath")
      .orderBy("created_at", "desc")
      .first();
    if (!activeBasePath) {
      return null;
    }
    return new BasePath(activeBasePath);
  }
}

module.exports = BasePath;
