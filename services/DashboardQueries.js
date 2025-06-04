const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.APP_ENV]);

class DashboardQueries {
  static get knex() {
    return knex;
  }

  // Helper para aplicar filtros con campos permitidos
  static _applyFilters(query, filters, tableAlias = "", allowedFields = []) {
    const prefix = tableAlias ? `${tableAlias}.` : "";

    const filterMap = {
      startDate: (q) =>
        q.where(`${prefix}created_at`, ">=", new Date(filters.startDate)),
      endDate: (q) =>
        q.where(`${prefix}created_at`, "<=", new Date(filters.endDate)),
      status: (q) => q.where(`${prefix}status`, filters.status),
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key] && filterMap[key] && allowedFields.includes(key)) {
        filterMap[key](query);
      }
    });

    return query;
  }

  // 1. Total de Ventas
  static async getTotalSales(filters = {}) {
    const result = await this._applyFilters(
      this.knex("sales"),
      filters,
      "sales",
      ["startDate", "endDate"]
    ).count("* as total");
    return result[0].total;
  }

  // 2. Ingresos Totales (Facturación)
  static async getTotalRevenue(filters = {}) {
    const result = await this._applyFilters(
      this.knex("sales"),
      filters,
      "sales",
      ["startDate", "endDate"]
    ).sum("total_amount as total");
    return result[0].total;
  }

  // 3. Cantidad Total de Productos Vendidos
  static async getTotalProductsSold(filters = {}) {
    let query = this.knex("inventory_transactions").where(
      "transaction_type",
      "out"
    );
    query = this._applyFilters(query, filters, "inventory_transactions", [
      "startDate",
      "endDate",
    ]);
    const result = await query.sum("quantity as total");
    return result[0].total;
  }

  // 4. Órdenes Pendientes y Completadas
  static async getOrderStatusCounts(filters = {}) {
    return this._applyFilters(this.knex("orders"), filters, "orders", [
      "startDate",
      "endDate",
      "status",
    ])
      .select("status")
      .count("* as count")
      .groupBy("status");
  }

  // 5. Top Zonas por Ventas
  static async getTopZonesBySales(userID, filters = {}) {
    const businessIDs = await this.knex("users_businesses")
      .select("business_entity_id")
      .where("userID", userID);

    if (businessIDs.length === 0) return [];

    const businessIDList = businessIDs.map((b) => b.business_entity_id);

    let query = this.knex("sales")
      .join("users", "sales.userID", "users.id")
      .join("users_businesses", "users.id", "users_businesses.userID")
      .join(
        "business_entities",
        "users_businesses.business_entity_id",
        "business_entities.id"
      )
      .whereIn("users_businesses.business_entity_id", businessIDList);

    query = this._applyFilters(query, filters, "sales", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        this.knex.raw(
          "JSON_UNQUOTE(JSON_EXTRACT(business_entities.address, '$.state')) as state"
        ),
        this.knex.raw("SUM(sales.total_amount) as total_sales")
      )
      .groupBy("state")
      .orderBy("total_sales", "desc");
  }

  // 6. Mejores Días de Venta
  static async getBestSellingDays(filters = {}) {
    return this._applyFilters(this.knex("sales"), filters, "sales", [
      "startDate",
      "endDate",
    ])
      .select(
        this.knex.raw("DAYOFWEEK(created_at) as day_of_week"),
        this.knex.raw("SUM(total_amount) as total_sales")
      )
      .groupByRaw("DAYOFWEEK(created_at)")
      .orderBy("total_sales", "desc");
  }

  // 7. Top Clientes
  static async getTopClients(filters = {}) {
    let query = this.knex("sales").join("users", "sales.userID", "users.id");
    query = this._applyFilters(query, filters, "sales", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        this.knex.raw("CONCAT(users.firstname, ' ', users.lastname) as name"),
        "users.username",
        "users.birthdate",
        this.knex.raw("SUM(sales.total_amount) as total_spent")
      )
      .groupBy(
        "users.firstname",
        "users.lastname",
        "users.username",
        "users.birthdate"
      )
      .orderBy("total_spent", "desc")
      .limit(10);
  }

  // 8. Modelos Más Vendidos
  static async getTopSellingModels(filters = {}) {
    let query = this.knex("inventory_transactions")
      .join("models", "inventory_transactions.modelID", "models.id")
      .join("sales", "inventory_transactions.orderID", "sales.id")
      .where("inventory_transactions.transaction_type", "out");

    query = this._applyFilters(query, filters, "sales", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        "models.name as model",
        this.knex.raw("SUM(inventory_transactions.quantity) as total_sold")
      )
      .groupBy("models.name")
      .orderBy("total_sold", "desc")
      .limit(10);
  }

  // 9. Estado del Inventario (ahora con filtros de fecha)
  static async getInventoryStatus(filters = {}) {
    let query = this.knex("models").leftJoin(
      "inventory_transactions",
      "models.id",
      "inventory_transactions.modelID"
    );

    // ✅ Aplicar solo filtros de fecha directamente sobre inventory_transactions
    query = this._applyFilters(query, filters, "inventory_transactions", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        "models.name as model",
        this.knex.raw(`
        GREATEST(
          COALESCE(SUM(CASE WHEN inventory_transactions.transaction_type = 'in' THEN inventory_transactions.quantity ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN inventory_transactions.transaction_type = 'out' THEN inventory_transactions.quantity ELSE 0 END), 0),
          0
        ) as current_stock
      `)
      )
      .groupBy("models.id", "models.name")
      .orderBy("models.name");
  }

  // 10. Movimientos de Inventario
  static async getInventoryMovements() {
    return this.knex("inventory_transactions")
      .select(
        "transaction_type",
        this.knex.raw("SUM(quantity) as total_quantity")
      )
      .groupBy("transaction_type");
  }

  // 11. Formas de Pago Más Utilizadas
  static async getTopPaymentMethods() {
    return this.knex("salepayments")
      .join("paymenttypes", "salepayments.paymenttypeID", "paymenttypes.id")
      .select(
        "paymenttypes.description as metodo",
        this.knex.raw("COUNT(*) as Veces_usado")
      )
      .groupBy("paymenttypes.description")
      .orderBy("Veces_usado", "desc");
  }

  // 12. Pagos por Moneda
  static async getPaymentsByCurrency() {
    return this.knex("salepayments")
      .join("currencies", "salepayments.currencyID", "currencies.id")
      .select(
        "currencies.name as currency",
        this.knex.raw("SUM(amount) as total_amount")
      )
      .groupBy("currencies.name");
  }

  // 13. Ventas por Categoría
  static async getSalesBySaleType(filters = {}) {
    let query = this.knex("sales")
      .join("saleparameters", "sales.saleparameterID", "saleparameters.id")
      .join("saletypes", "saleparameters.saletypeID", "saletypes.id");

    query = this._applyFilters(query, filters, "sales", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        "saletypes.description as forma_de_pago",
        this.knex.raw("SUM(sales.total_amount) as ventas_totales")
      )
      .groupBy("saletypes.description")
      .orderBy("ventas_totales", "desc");
  }

  // 14. Tasa de Conversión de Órdenes a Ventas
  static async getOrderToSalesConversionRate(filters = {}) {
    const baseQuery = this._applyFilters(
      this.knex("orders"),
      filters,
      "orders",
      ["startDate", "endDate", "status"]
    );

    const [completedOrders] = await baseQuery
      .clone()
      .where("status", "aprobado")
      .count("* as count");
    const [totalOrders] = await baseQuery.count("* as count");

    return (completedOrders.count / totalOrders.count) * 100;
  }

  // 15. Ventas por Negocio o Punto de Venta
  static async getSalesByBusiness(filters = {}) {
    let query = this.knex("sales")
      .join("users", "sales.userID", "users.id")
      .join("users_businesses", "users.id", "users_businesses.userID")
      .join(
        "business_entities",
        "users_businesses.business_entity_id",
        "business_entities.id"
      );

    query = this._applyFilters(query, filters, "sales", [
      "startDate",
      "endDate",
    ]);

    return query
      .select(
        "business_entities.legal_name as business",
        this.knex.raw("SUM(sales.total_amount) as total_sales")
      )
      .groupBy("business_entities.legal_name")
      .orderBy("total_sales", "desc");
  }
}

module.exports = DashboardQueries;
