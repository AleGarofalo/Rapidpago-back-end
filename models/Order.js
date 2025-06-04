const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class Order {
  constructor(data) {
    this.id = data.id;
    this.order_number = data.order_number;
    this.amount = data.amount;
    this.remaining_balance = data.remaining_balance;
    this.userID = data.userID;
    this.saleparameterID = data.saleparameterID;
    this.businessID = data.businessID;
    this.status = data.status;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  // Obtener todas las ventas
  static async getAll() {
    const orders = await this.knex("orders").select();
    return orders.map((order) => new Order(order));
  }

  // Obtener una venta por ID
  static async getById(id) {
    const order = await this.knex("orders").where("id", id).first();
    if (!order) {
      return null;
    }
    return new Order(order);
  }

  // Obtener órdenes por businessID
  static async getByBusiness(businessID) {
    const orders = await this.knex("orders").where("businessID", businessID);
    return orders.map((order) => new Order(order));
  }

  static async getPendingOrdersForUser(userID) {
    // Paso 1: Obtener los IDs de los negocios asociados al usuario
    const businessIDs = await this.knex("users_businesses")
      .select("business_entity_id")
      .where("userID", userID);

    if (businessIDs.length === 0) {
      return []; // Retorna vacío si no hay negocios asociados
    }

    // Extraer solo los IDs en un array
    const businessIDArray = businessIDs.map((b) => b.business_entity_id);

    // Paso 2: Buscar las órdenes pendientes para esos negocios
    const pendingOrders = await this.knex("orders")
      .whereIn("businessID", businessIDArray)
      .andWhere("status", "pendiente")
      .andWhere("remaining_balance", ">", 0);

    return pendingOrders.map((order) => new Order(order));
  }

  static async getOrderSummaryForUser(userID) {
    // Obtener órdenes directamente por userID
    const orderSummary = await knex("orders as o")
      .select(
        "o.id as order_id",
        "o.order_number",
        "o.amount",
        "o.status",
        "o.created_at as order_date",
        "m.name as model_name",
        "it.quantity",
        "sp.amount as sale_parameter_amount",
        "sp.days",
        "sp.quota",
        "sp.active as sale_parameter_active",
        "sp.start_date",
        "sp.end_date",
        knex.raw(
          "IFNULL(GROUP_CONCAT(DISTINCT pt.description ORDER BY pt.description ASC), 'Sin pagos') as payment_methods"
        ) // Usar 'Sin pagos' para órdenes sin pagos
      )
      .join("inventory_transactions as it", "o.id", "it.orderID")
      .join("models as m", "it.modelID", "m.id")
      .join("saleparameters as sp", "o.saleparameterID", "sp.id") // Relación válida
      .leftJoin("order_payments as op", "o.id", "op.orderID") // Relación con pagos por orden
      .leftJoin("paymenttypes as pt", "op.paymenttypeID", "pt.id") // Relación con tipos de pago
      .where("o.userID", userID) // Filtrar directamente por el userID de la tabla orders
      .groupBy("o.id") // Agrupar por ID de orden
      .orderBy("o.created_at", "asc");

    console.log("Órdenes obtenidas", orderSummary);

    return orderSummary;
  }

  static async getOrderDetails(orderID) {
    const orderDetails = await knex("orders as o")
      .select(
        "o.id as order_id",
        "o.order_number",
        "o.amount",
        "o.remaining_balance",
        "o.status",
        "o.created_at as order_date",
        "sp.amount as sale_parameter_amount",
        "sp.days",
        "sp.quota",
        "sp.active as sale_parameter_active",
        "sp.start_date",
        "sp.end_date",
        "be.legal_name as business_name",
        knex.raw(
          "GROUP_CONCAT(DISTINCT pt.description ORDER BY pt.description ASC) as payment_methods"
        ) // Formas de pago agrupadas
      )
      .join("saleparameters as sp", "o.saleparameterID", "sp.id")
      .join("business_entities as be", "o.businessID", "be.id")
      .leftJoin("order_payments as op", "o.id", "op.orderID")
      .leftJoin("paymenttypes as pt", "op.paymenttypeID", "pt.id")
      .where("o.id", orderID)
      .groupBy("o.id");

    const modelsAndQuantities = await knex("inventory_transactions as it")
      .select("m.name as model_name", "it.quantity")
      .join("models as m", "it.modelID", "m.id")
      .where("it.orderID", orderID);

    const payments = await knex("order_payments as op")
      .select(
        "op.payment_amount",
        "op.currencyID",
        "op.exchange_rate",
        "op.exchange_date",
        "op.created_at as payment_date",
        "pt.description as payment_type",
        "op.Details",
        "c.name as currency_name" // Nombre de la divisa
      )
      .join("paymenttypes as pt", "op.paymenttypeID", "pt.id")
      .join("currencies as c", "op.currencyID", "c.id") // Relación con la tabla currencies
      .where("op.orderID", orderID);

    return {
      orderDetails: orderDetails[0], // Información principal de la orden
      modelsAndQuantities, // Modelos y cantidades solicitadas
      payments, // Detalle de pagos realizados
    };
  }

  // Obtener órdenes por rango de fechas
  static async getOrdersByDateRange(startDate, endDate) {
    const orders = await this.knex("orders").whereBetween("created_at", [
      startDate,
      endDate,
    ]);
    return orders.map((order) => new Order(order));
  }

  static async getPendingOrdersByBusiness(businessID) {
    try {
      const orders = await this.knex("orders")
        .where("businessID", businessID)
        .andWhere("status", "pendiente")
        .andWhere("remaining_balance", ">", 0);

      return orders.map((order) => new Order(order));
    } catch (error) {
      console.error("Error al obtener órdenes pendientes:", error);
      throw error;
    }
  }

  // Crear una nueva venta
  static async create(data) {
    const [id] = await this.knex("orders").insert(data);
    const order = await this.knex("orders").where("id", id).first();
    return new Order(order);
  }

  // Actualizar una venta por ID
  static async update(id, data) {
    const affectedRows = await this.knex("orders").where("id", id).update(data);
    if (affectedRows === 0) {
      throw new Error("Order not found");
    }
    console.log("Paso por aqui");
    return await this.getById(id);
  }

  // Eliminar una venta por ID
  static async delete(id) {
    const deletedOrder = await this.knex("orders").where("id", id).del();
    return deletedOrder;
  }
}

module.exports = Order;
