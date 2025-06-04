exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("inventory_transactions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("inventory_transactions").insert([
        { id: 1, modelID: 1, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 2, modelID: 2, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 3, modelID: 3, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 4, modelID: 4, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 5, modelID: 5, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 6, modelID: 6, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 7, modelID: 7, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 8, modelID: 8, quantity: 25, transaction_type: "in", userID: 1 },
        { id: 9, modelID: 9, quantity: 25, transaction_type: "in", userID: 1 },
        {
          id: 10,
          modelID: 10,
          quantity: 25,
          transaction_type: "in",
          userID: 1,
        },
        {
          modelID: 1,
          userID: 1,
          orderID: 1, // ORD001
          quantity: 2,
          transaction_type: "out",
        },
        {
          modelID: 2,
          userID: 1,
          orderID: 2, // ORD002
          quantity: 1,
          transaction_type: "out",
        },
        {
          modelID: 3,
          userID: 1,
          orderID: 3, // ORD003
          quantity: 5,
          transaction_type: "out",
        },
        {
          modelID: 4,
          userID: 1,
          orderID: 4, // ORD004
          quantity: 10,
          transaction_type: "out",
        },
        {
          modelID: 5,
          userID: 1,
          orderID: 5, // ORD005
          quantity: 3,
          transaction_type: "out",
        },
        {
          modelID: 6,
          userID: 1,
          orderID: 6, // ORD006
          quantity: 7,
          transaction_type: "out",
        },
        {
          modelID: 7,
          userID: 1,
          orderID: 7, // ORD007
          quantity: 1,
          transaction_type: "out",
        },
        {
          modelID: 8,
          userID: 1,
          orderID: 8, // ORD008
          quantity: 4,
          transaction_type: "out",
        },
        {
          modelID: 9,
          userID: 1,
          orderID: 9, // ORD009
          quantity: 6,
          transaction_type: "out",
        },
        {
          modelID: 10,
          userID: 1,
          orderID: 10, // ORD010
          quantity: 2,
          transaction_type: "out",
        },
        {
          modelID: 3,
          userID: 1,
          orderID: 11, // ORD011
          quantity: 5,
          transaction_type: "out",
        },
        {
          modelID: 4,
          userID: 1,
          orderID: 12, // ORD012
          quantity: 2,
          transaction_type: "out",
        },
        {
          modelID: 5,
          userID: 1,
          orderID: 13, // ORD013
          quantity: 8,
          transaction_type: "out",
        },
        {
          modelID: 6,
          userID: 1,
          orderID: 14, // ORD014
          quantity: 3,
          transaction_type: "out",
        },
        {
          modelID: 7,
          userID: 1,
          orderID: 15, // ORD015
          quantity: 6,
          transaction_type: "out",
        },
        {
          modelID: 8,
          userID: 1,
          orderID: 16, // ORD016
          quantity: 9,
          transaction_type: "out",
        },
        {
          modelID: 9,
          userID: 1,
          orderID: 17, // ORD017
          quantity: 4,
          transaction_type: "out",
        },
        {
          modelID: 10,
          userID: 1,
          orderID: 18, // ORD018
          quantity: 2,
          transaction_type: "out",
        },
        {
          modelID: 1,
          userID: 1,
          orderID: 19, // ORD019
          quantity: 5,
          transaction_type: "out",
        },
        {
          modelID: 2,
          userID: 1,
          orderID: 20, // ORD020
          quantity: 3,
          transaction_type: "out",
        },
      ]);
    });
};
