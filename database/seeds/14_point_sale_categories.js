exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('point_sale_categories').del()
      .then(async function () {
        // Inserts seed entries
        return knex('point_sale_categories').insert([
          {
            codeName: 'C',
            displayName: 'Caja',
            description: 'Caja RapidPortal'
          },
        ]);
      });
  };