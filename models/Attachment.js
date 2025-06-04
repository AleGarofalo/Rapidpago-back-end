const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class Attachment {
  constructor(data) {
    this._id = data.id;
    this.filename = data.filename;
    this.path = data.path;
    this.file_type = data.file_type;
    this.file_size = data.file_size;
    this.created_at = data.createdAt;
    this.updated_at = data.updatedAt;
  }

  static get knex() {
    return knex;
  }

  static async getAll() {
    const Attachments = await this.knex("attachments").select();
    return Attachments.map((b) => new Attachment(b));
  }

  static async getById(id) {
    const attachment = await this.knex("attachments").where("id", id).first();
    if (!attachment) {
      return null;
    }
    return new Attachment(attachment);
  }

  static async create(data) {
    const [attachment] = await this.knex("attachments").insert(data);
    return attachment;
  }

  static async update(id, data) {
    const affectedRows = await this.knex("attachments")
      .where("id", id)
      .update(data);
    if (affectedRows === 0) {
      throw new Error("Attachment not found");
    }
    return await this.getById(id); // Get the updated bank
  }
}

module.exports = Attachment;
