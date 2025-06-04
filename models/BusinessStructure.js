const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class BusinessStructure {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.parent_id = data.parent_id;
    this.userID = data.userID;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  static async getStructureByUser(userID) {
    const structure = await this.knex("Business_Structure").where(
      "userID",
      userID
    );

    const structureWithChildren = await Promise.all(
      structure.map(async (node) => {
        const children = await this.getChildren(node.id); // Obtener hijos para cada nodo
        return {
          ...node,
          children, // Agregar hijos al nodo
        };
      })
    );

    return structureWithChildren.map((node) => new BusinessStructure(node));
  }

  static async getById(id) {
    const node = await this.knex("Business_Structure").where("id", id).first();
    if (!node) {
      return null;
    }
    const children = await this.getChildren(id); // Obtener los hijos
    return {
      ...node,
      children, // Agregar hijos al nodo
    };
  }

  // Crear un nuevo nodo
  static async create(data) {
    const [id] = await this.knex("Business_Structure").insert(data);
    const newNode = await this.knex("Business_Structure")
      .where("id", id)
      .first();
    return new BusinessStructure(newNode);
  }

  // Actualizar un nodo por ID
  static async update(id, data) {
    const affectedRows = await this.knex("Business_Structure")
      .where("id", id)
      .update(data);
    if (affectedRows === 0) {
      throw new Error("Node not found");
    }
    return await this.getById(id);
  }

  // Eliminar un nodo por ID
  static async delete(id) {
    const deletedNode = await this.knex("Business_Structure")
      .where("id", id)
      .del();
    return deletedNode;
  }

  // Obtener los nodos hijos de un nodo
  static async getChildren(parent_id) {
    const children = await this.knex("Business_Structure").where(
      "parent_id",
      parent_id
    );
    return children.map((node) => new BusinessStructure(node));
  }

  // Obtener la jerarquía completa (de forma recursiva)
  static async getHierarchy(userID) {
    const nodes = await this.knex("Business_Structure").where("userID", userID);

    const buildTree = (parentId) => {
      return nodes
        .filter((node) => node.parent_id === parentId)
        .map((node) => ({
          ...node,
          children: buildTree(node.id),
        }));
    };

    return buildTree(null); // Construir jerarquía desde la raíz (parent_id === null)
  }
}

module.exports = BusinessStructure;
