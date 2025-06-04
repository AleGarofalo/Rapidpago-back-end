const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class Stock {
  constructor(data) {
    this.id = data.id;
    this.modelID = data.modelID;
    this.orderID = data.orderID;
    this.quantity = data.quantity;
    this.userID = data.userID;
    this.transaction_type = data.transaction_type;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  // Obtener todas las ventas
  static async getAll() {
    const stocks = await this.knex("inventory_transactions").select();
    return stocks.map((stock) => new Stock(stock));
  }

  static async getStockTransaction(id, itemID, orderID) {
    const affectedRows = await this.knex("inventory_transactions").where({
      id,
      itemID,
      orderID,
    }); // Filtrar por las tres claves

    // Si no se afecta ninguna fila, lanzar un error indicando que no se encontró la transacción
    if (affectedRows === 0) {
      throw new Error("Inventory transaction not found");
    }

    // Retorna la transacción actualizada
    return affectedRows.map((transaction) => new Stock(transaction));
  }

  // Obtener una o más transacciones por ID
  static async getById(id) {
    const transactions = await this.knex("inventory_transactions").where(
      "id",
      id
    );

    // Si no se encuentran registros, retorna null o una lista vacía, dependiendo de la lógica que prefieras
    if (!transactions) {
      return null; // O podrías retornar `[]` si prefieres que sea una lista vacía
    }

    // Si deseas crear instancias del modelo Sale para cada fila, puedes usar map
    return transactions.map((transaction) => new Stock(transaction));
  }

  static async getInventory() {
    const result = await this.knex("inventory_transactions")
      .select("inventory_transactions.modelID", "models.name")
      .sum({
        cantidad: knex.raw(`
                CASE 
                    WHEN inventory_transactions.transaction_type = 'in' THEN quantity 
                    WHEN inventory_transactions.transaction_type = 'out' THEN -quantity 
                END
            `),
      }) // Aquí aplicamos el alias 'cantidad' correctamente
      .from("inventory_transactions")
      .join("models", "inventory_transactions.modelID", "=", "models.id")
      .groupBy("inventory_transactions.modelID", "models.name")
      .having(
        knex.raw(`
            SUM(CASE 
                WHEN inventory_transactions.transaction_type = 'in' THEN quantity 
                WHEN inventory_transactions.transaction_type = 'out' THEN -quantity 
            END) > 0
        `)
      );

    return result;
  }

  // Crear una nueva venta
  static async create(data) {
    const [id] = await this.knex("inventory_transactions").insert(data);
    const transaction = await this.knex("inventory_transactions")
      .where("id", id)
      .first();
    console.log("la transaccion creada", transaction);
    return new Stock(transaction);
  }

  // Actualizar una transacción de inventario por ID, itemID, y orderID
  static async update(id, itemID, orderID, data) {
    // Actualiza la transacción donde coinciden el id, itemID y orderID
    const affectedRows = await this.knex("inventory_transactions")
      .where({ id, itemID, orderID }) // Filtrar por las tres claves
      .update(data);

    // Si no se afecta ninguna fila, lanzar un error indicando que no se encontró la transacción
    if (affectedRows === 0) {
      throw new Error("Inventory transaction not found");
    }

    // Retorna la transacción actualizada
    return await this.getById(id, itemID, orderID); // Usamos las tres claves para obtener el registro
  }

  // Eliminar una venta por ID
  static async delete(id) {
    const deletedInventory = await this.knex("inventory_transactions")
      .where("id", id)
      .del();
    return deletedInventory;
  }
}

module.exports = Stock;
