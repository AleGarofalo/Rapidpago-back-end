exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("paymenttypes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("paymenttypes").insert([
        { description: "Efectivo", userID: null },
        { description: "Tarjeta de Crédito", userID: null },
        { description: "Tarjeta de Débito", userID: null },
        { description: "Zelle", userID: null },
        { description: "Transferencia Bancaria", userID: null },
        { description: "Pago Móvil", userID: null },
      ]);
    });
};
