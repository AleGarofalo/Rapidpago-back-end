exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("order_payments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("order_payments").insert([
        // Pagos para ORD001
        {
          orderID: 1,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "John Doe",
            reference: "123456",
          }),
          payment_amount: 200.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-01-10",
          userID: 1,
        },
        {
          orderID: 1,
          paymenttypeID: 2, // Efectivo
          Details: JSON.stringify({ note: "Pago en efectivo" }),
          payment_amount: 100.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-01-10",
          userID: 1,
        },

        // Pagos para ORD002
        {
          orderID: 2,
          paymenttypeID: 3, // Transferencia
          Details: JSON.stringify({ bank: "Banco ABC", reference: "TXN78910" }),
          payment_amount: 300.5,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-01-15",
          userID: 1,
        },

        // Pagos para ORD003
        {
          orderID: 3,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "Jane Smith",
            reference: "654321",
          }),
          payment_amount: 250.75,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-01-20",
          userID: 1,
        },

        // Pagos para ORD004
        {
          orderID: 4,
          paymenttypeID: 4, // Zelle
          Details: JSON.stringify({
            zelleAccount: "user@example.com",
            reference: "ZEL001",
          }),
          payment_amount: 600.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-01-25",
          userID: 1,
        },

        // Pagos para ORD005
        {
          orderID: 5,
          paymenttypeID: 2, // Efectivo
          Details: JSON.stringify({ note: "Pago en efectivo completo" }),
          payment_amount: 450.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-01",
          userID: 1,
        },

        // Pagos para ORD006 (múltiples formas de pago)
        {
          orderID: 6,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "Michael Brown",
            reference: "CARD555",
          }),
          payment_amount: 500.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-10",
          userID: 1,
        },
        {
          orderID: 6,
          paymenttypeID: 2, // Efectivo
          Details: JSON.stringify({ note: "Pago en efectivo parcial" }),
          payment_amount: 400.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-10",
          userID: 1,
        },

        // Pagos para ORD007
        {
          orderID: 7,
          paymenttypeID: 3, // Transferencia
          Details: JSON.stringify({ bank: "Banco XYZ", reference: "TXN33322" }),
          payment_amount: 650.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-12",
          userID: 1,
        },

        // Pagos para ORD008
        {
          orderID: 8,
          paymenttypeID: 4, // Zelle
          Details: JSON.stringify({
            zelleAccount: "zelleuser@example.com",
            reference: "ZEL008",
          }),
          payment_amount: 600.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-18",
          userID: 1,
        },

        // Pagos para ORD009
        {
          orderID: 9,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "Laura Smith",
            reference: "CARD123",
          }),
          payment_amount: 400.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-02-20",
          userID: 1,
        },

        // Pagos para ORD010
        {
          orderID: 10,
          paymenttypeID: 2, // Efectivo
          Details: JSON.stringify({ note: "Pago en efectivo completo" }),
          payment_amount: 275.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-01",
          userID: 1,
        },

        // Pagos para ORD011
        {
          orderID: 11,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "David Wilson",
            reference: "CARD987",
          }),
          payment_amount: 300.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-05",
          userID: 1,
        },

        // Pagos para ORD012
        {
          orderID: 12,
          paymenttypeID: 3, // Transferencia
          Details: JSON.stringify({ bank: "Banco DEF", reference: "TXN456" }),
          payment_amount: 200.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-08",
          userID: 1,
        },

        // Pagos para ORD013
        {
          orderID: 13,
          paymenttypeID: 4, // Zelle
          Details: JSON.stringify({
            zelleAccount: "zelleanother@example.com",
            reference: "ZEL013",
          }),
          payment_amount: 800.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-15",
          userID: 1,
        },

        // Pagos para ORD014
        {
          orderID: 14,
          paymenttypeID: 2, // Efectivo
          Details: JSON.stringify({ note: "Pago inicial" }),
          payment_amount: 450.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-18",
          userID: 1,
        },

        // Pagos para ORD015
        {
          orderID: 15,
          paymenttypeID: 1, // Tarjeta
          Details: JSON.stringify({
            cardHolder: "Peter Jackson",
            reference: "CARD155",
          }),
          payment_amount: 500.0,
          currencyID: 1,
          exchange_rate: 1.0,
          exchange_date: "2024-03-25",
          userID: 1,
        },
      ]);
    });
};
