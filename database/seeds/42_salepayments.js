exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("salepayments")
    .del()
    .then(function () {
      // Inserts seed entries (Ejemplo de 40 pagos, algunos con multi-pago)
      return knex("salepayments").insert([
        // 🔹 Ventas con un solo pago
        {
          saleID: 1,
          amount: 500.0,
          exchange_rate: 1.0,
          exchange_date: "2024-01-10",
          currencyID: 1,
          paymenttypeID: 1,
          userID: 1,
          created_at: "2024-01-10",
        },
        {
          saleID: 2,
          amount: 300.5,
          exchange_rate: 1.0,
          exchange_date: "2024-01-15",
          currencyID: 2,
          paymenttypeID: 2,
          userID: 1,
          created_at: "2024-01-15",
        },
        {
          saleID: 3,
          amount: 750.75,
          exchange_rate: 1.1,
          exchange_date: "2024-01-20",
          currencyID: 3,
          paymenttypeID: 3,
          userID: 1,
          created_at: "2024-01-20",
        },

        // 🔹 Ventas con pagos divididos (Multi-pago)
        {
          saleID: 4,
          amount: 800.0,
          exchange_rate: 1.2,
          exchange_date: "2024-01-25",
          currencyID: 1,
          paymenttypeID: 4,
          userID: 1,
          created_at: "2024-01-25",
        },
        {
          saleID: 4,
          amount: 400.0,
          exchange_rate: 1.2,
          exchange_date: "2024-01-25",
          currencyID: 2,
          paymenttypeID: 5,
          userID: 1,
          created_at: "2024-01-25",
        },

        {
          saleID: 5,
          amount: 250.0,
          exchange_rate: 1.3,
          exchange_date: "2024-02-01",
          currencyID: 1,
          paymenttypeID: 6,
          userID: 1,
          created_at: "2024-02-01",
        },
        {
          saleID: 5,
          amount: 200.0,
          exchange_rate: 1.3,
          exchange_date: "2024-02-01",
          currencyID: 3,
          paymenttypeID: 2,
          userID: 1,
          created_at: "2024-02-01",
        },

        {
          saleID: 6,
          amount: 500.0,
          exchange_rate: 1.1,
          exchange_date: "2024-02-10",
          currencyID: 2,
          paymenttypeID: 3,
          userID: 1,
          created_at: "2024-02-10",
        },
        {
          saleID: 6,
          amount: 499.99,
          exchange_rate: 1.1,
          exchange_date: "2024-02-10",
          currencyID: 3,
          paymenttypeID: 1,
          userID: 1,
          created_at: "2024-02-10",
        },

        // 🔹 Más ventas con un solo pago
        {
          saleID: 7,
          amount: 650.0,
          exchange_rate: 1.0,
          exchange_date: "2024-02-12",
          currencyID: 1,
          paymenttypeID: 4,
          userID: 1,
          created_at: "2024-02-12",
        },
        {
          saleID: 8,
          amount: 900.0,
          exchange_rate: 1.2,
          exchange_date: "2024-02-18",
          currencyID: 3,
          paymenttypeID: 5,
          userID: 1,
          created_at: "2024-02-18",
        },

        // 🔹 Más ventas con pagos divididos
        {
          saleID: 9,
          amount: 600.0,
          exchange_rate: 1.2,
          exchange_date: "2024-02-20",
          currencyID: 1,
          paymenttypeID: 1,
          userID: 1,
          created_at: "2024-02-20",
        },
        {
          saleID: 9,
          amount: 500.0,
          exchange_rate: 1.2,
          exchange_date: "2024-02-20",
          currencyID: 2,
          paymenttypeID: 3,
          userID: 1,
          created_at: "2024-02-20",
        },

        {
          saleID: 10,
          amount: 275.0,
          exchange_rate: 1.3,
          exchange_date: "2024-03-01",
          currencyID: 2,
          paymenttypeID: 4,
          userID: 1,
          created_at: "2024-03-01",
        },

        {
          saleID: 11,
          amount: 600.0,
          exchange_rate: 1.1,
          exchange_date: "2024-03-05",
          currencyID: 3,
          paymenttypeID: 6,
          userID: 1,
          created_at: "2024-03-05",
        },

        {
          saleID: 12,
          amount: 350.0,
          exchange_rate: 1.2,
          exchange_date: "2024-03-08",
          currencyID: 1,
          paymenttypeID: 2,
          userID: 1,
          created_at: "2024-03-08",
        },

        {
          saleID: 13,
          amount: 400.0,
          exchange_rate: 1.2,
          exchange_date: "2024-03-15",
          currencyID: 2,
          paymenttypeID: 5,
          userID: 1,
          created_at: "2024-03-15",
        },
        {
          saleID: 13,
          amount: 400.0,
          exchange_rate: 1.2,
          exchange_date: "2024-03-15",
          currencyID: 3,
          paymenttypeID: 6,
          userID: 1,
          created_at: "2024-03-15",
        },

        {
          saleID: 14,
          amount: 450.0,
          exchange_rate: 1.1,
          exchange_date: "2024-03-18",
          currencyID: 1,
          paymenttypeID: 4,
          userID: 1,
          created_at: "2024-03-18",
        },

        {
          saleID: 15,
          amount: 600.0,
          exchange_rate: 1.3,
          exchange_date: "2024-03-25",
          currencyID: 2,
          paymenttypeID: 1,
          userID: 1,
          created_at: "2024-03-25",
        },

        {
          saleID: 16,
          amount: 500.0,
          exchange_rate: 1.0,
          exchange_date: "2024-04-01",
          currencyID: 3,
          paymenttypeID: 3,
          userID: 1,
          created_at: "2024-04-01",
        },
      ]);
    });
};
