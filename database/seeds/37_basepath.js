exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("basePath")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("basePath").insert([
        {
          ruta_base: "/home/accrapidpago/LegalDocuments/",
        },
      ]);
    });
};
