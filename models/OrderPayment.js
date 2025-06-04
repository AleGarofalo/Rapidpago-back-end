const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class OrderPayment {
  constructor(data) {
    this.id = data.id;
    this.orderID = data.orderID;
    this.order_number = data.order_number;
    this.paymenttypeID = data.paymenttypeID;
    this.paymenttype = data.paymenttype; // Descripción del tipo de pago
    this.payment_amount = data.payment_amount;
    this.currencyID = data.currencyID;
    this.currency = data.currency; // Nombre de la moneda
    this.Details = JSON.parse(data.Details);
    this.exchange_rate = data.exchange_rate;
    this.exchange_date = data.exchange_date;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static get knex() {
    return knex;
  }

  // Obtener todos los pagos de una orden por orderID
  static async getAll() {
    const orderpayments = await this.knex("order_payments")
      .join("currencies", "order_payments.currencyID", "currencies.id")
      .join("paymenttypes", "order_payments.paymenttypeID", "paymenttypes.id")
      .select(
        "order_payments.*", // Selecciona todos los campos de la tabla 'order_payments'
        "currencies.name as currency", // Obtén el nombre de la moneda
        "paymenttypes.description as paymenttype" // Obtén la descripción del tipo de pago
      );

    return orderpayments.map((orderpayment) => new OrderPayment(orderpayment));
  }

  // Obtener todos los pagos de una orden por orderID
  static async getByOrderID(orderID) {
    const payments = await this.knex("order_payments")
      .select(
        "order_payments.*",
        "orders.order_number",
        "currencies.name as currency",
        "paymenttypes.description as paymenttype"
      )
      .join("orders", "order_payments.orderID", "orders.id")
      .join("currencies", "order_payments.currencyID", "currencies.id")
      .join("paymenttypes", "order_payments.paymenttypeID", "paymenttypes.id")
      .where("order_payments.orderID", orderID);

    return payments.map((payment) => new OrderPayment(payment));
  }

  // Obtener todos los pagos de una orden por order_number
  static async getByOrderNumber(order_number) {
    const payments = await this.knex("order_payments")
      .select(
        "order_payments.*",
        "orders.order_number",
        "currencies.name as currency",
        "paymenttypes.description as paymenttype"
      )
      .join("orders", "order_payments.orderID", "orders.id")
      .join("currencies", "order_payments.currencyID", "currencies.id")
      .join("paymenttypes", "order_payments.paymenttypeID", "paymenttypes.id")
      .where("orders.order_number", order_number);

    return payments.map((payment) => new OrderPayment(payment));
  }

  // Calcular el monto pendiente de una orden
  static async getRemainingAmountByOrderID(orderID) {
    const order = await this.knex("orders").where("id", orderID).first();

    if (!order) {
      throw new Error("Order not found");
    }

    const totalPaid = await this.knex("order_payments")
      .where("orderID", orderID)
      .sum("payment_amount as totalPaid")
      .first();

    const remainingAmount = order.amount - (totalPaid?.totalPaid || 0);
    return {
      orderID: order.id,
      orderNumber: order.order_number,
      totalAmount: order.amount,
      totalPaid: totalPaid?.totalPaid || 0,
      remainingAmount: Math.max(remainingAmount, 0), // No permitir valores negativos
    };
  }

  static async getPaymentsByDateRange(startDate, endDate) {
    const payments = await this.knex("order_payments")
      .select(
        "order_payments.*",
        "orders.order_number",
        "currencies.name as currency",
        "paymenttypes.description as paymenttype"
      )
      .join("orders", "order_payments.orderID", "orders.id")
      .join("currencies", "order_payments.currencyID", "currencies.id")
      .join("paymenttypes", "order_payments.paymenttypeID", "paymenttypes.id")
      .whereBetween("order_payments.created_at", [startDate, endDate]);

    return payments.map((payment) => new OrderPayment(payment));
  }

  // Crear un nuevo pago
  static async create(data) {
    const [id] = await this.knex("order_payments").insert(data);
    const payment = await this.knex("order_payments").where("id", id).first();
    return new OrderPayment(payment);
  }

  // Actualizar un pago por ID
  static async update(id, data) {
    const affectedRows = await this.knex("order_payments")
      .where("id", id)
      .update(data);
    if (affectedRows === 0) {
      throw new Error("Order Payment not found");
    }
    return await this.getById(id);
  }

  // Obtener un pago por ID
  static async getById(id) {
    const payment = await this.knex("order_payments")
      .select(
        "order_payments.*",
        "orders.order_number",
        "currencies.name as currency_name",
        "paymenttypes.description as paymenttype"
      )
      .join("orders", "order_payments.orderID", "orders.id")
      .join("currencies", "order_payments.currencyID", "currencies.id")
      .join("paymenttypes", "order_payments.paymenttypeID", "paymenttypes.id")
      .where("order_payments.id", id)
      .first();

    if (!payment) {
      return null;
    }
    return new OrderPayment(payment);
  }

  // Eliminar un pago por ID
  static async delete(id) {
    const deletedPayment = await this.knex("order_payments")
      .where("id", id)
      .del();
    return deletedPayment;
  }
}

module.exports = OrderPayment;
