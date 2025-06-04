const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class ContactPerson {
  constructor(data) {
    this.id = data.id;
    this.name = data.Name;
    this.lastName = data.LastName;
    this.phonecode1 = data.phonecode1;
    this.phone1 = data.Phone1;
    this.phonecode2 = data.phonecode2;
    this.phone2 = data.Phone2;
    this.email = data.Email;
    this.address = data.address;
    this.representante_legal = data.representante_legal;
    this.businessid = data.businessid;
    this.business_name = data.business_name;
    this.userID = data.userID;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  // Obtener todos los registros de contact_people
  static async getAll() {
    const contacts = await this.knex("contact_people")
      .join(
        "business_entities",
        "contact_people.businessid",
        "business_entities.id"
      )
      .select("contact_people.*", "business_entities.name as business_name");
    return contacts.map((contact) => new ContactPerson(contact));
  }

  // Obtener por ID
  static async getById(id) {
    const contact = await this.knex("contact_people")
      .join(
        "business_entities",
        "contact_people.businessid",
        "business_entities.id"
      )
      .where("contact_people.id", id)
      .select("contact_people.*", "business_entities.name as business_name")
      .first();
    if (!contact) {
      return null;
    }
    return new ContactPerson(contact);
  }

  static async getContactPerson(businessid) {
    const ContactPerson = await this.knex("contact_people")
      .where("businessid", businessid)
      .first();
    if (!ContactPerson) {
      return null;
    }
    return new ContactPerson(ContactPerson);
  }

  // Crear un nuevo contacto
  static async create(data) {
    const [id] = await this.knex("contact_people").insert(data);
    const newContact = await this.knex("contact_people")
      .where("id", id)
      .first();
    return new ContactPerson(newContact);
  }

  // Actualizar un contacto por ID
  static async update(id, data) {
    const affectedRows = await this.knex("contact_people")
      .where("id", id)
      .update(data);
    if (affectedRows === 0) {
      throw new Error("Contact not found");
    }
    return await this.getById(id);
  }

  // Eliminar un contacto por ID
  static async delete(id) {
    const deletedContact = await this.knex("contact_people")
      .where("id", id)
      .del();
    return deletedContact;
  }
}

module.exports = ContactPerson;
