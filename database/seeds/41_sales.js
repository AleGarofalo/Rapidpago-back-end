exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("sales")
    .del()
    .then(function () {
      // Inserts seed entries (40 registros distribuidos entre los nuevos saleparameterID)
      return knex("sales").insert([
        // Usando saleparameterID del 1 al 6
        {
          total_amount: 500.0,
          userID: 1,
          saleparameterID: 1,
          feetypeID: 1,
          businessID: 1,
          created_at: "2024-01-10",
        },
        {
          total_amount: 300.5,
          userID: 1,
          saleparameterID: 4,
          feetypeID: 2,
          businessID: 1,
          created_at: "2024-01-15",
        },
        {
          total_amount: 750.75,
          userID: 1,
          saleparameterID: 2,
          feetypeID: 3,
          businessID: 1,
          created_at: "2024-01-20",
        },
        {
          total_amount: 1200.0,
          userID: 1,
          saleparameterID: 5,
          feetypeID: 4,
          businessID: 1,
          created_at: "2024-01-25",
        },
        {
          total_amount: 450.0,
          userID: 1,
          saleparameterID: 3,
          feetypeID: 5,
          businessID: 1,
          created_at: "2024-02-01",
        },
        {
          total_amount: 999.99,
          userID: 1,
          saleparameterID: 6,
          feetypeID: 6,
          businessID: 1,
          created_at: "2024-02-10",
        },
        {
          total_amount: 650.0,
          userID: 1,
          saleparameterID: 1,
          feetypeID: 1,
          businessID: 1,
          created_at: "2024-02-12",
        },
        {
          total_amount: 900.0,
          userID: 1,
          saleparameterID: 2,
          feetypeID: 2,
          businessID: 1,
          created_at: "2024-02-18",
        },
        {
          total_amount: 1100.0,
          userID: 1,
          saleparameterID: 3,
          feetypeID: 3,
          businessID: 1,
          created_at: "2024-02-20",
        },
        {
          total_amount: 275.0,
          userID: 1,
          saleparameterID: 4,
          feetypeID: 4,
          businessID: 1,
          created_at: "2024-03-01",
        },
        {
          total_amount: 600.0,
          userID: 1,
          saleparameterID: 5,
          feetypeID: 5,
          businessID: 1,
          created_at: "2024-03-05",
        },
        {
          total_amount: 350.0,
          userID: 1,
          saleparameterID: 6,
          feetypeID: 6,
          businessID: 1,
          created_at: "2024-03-08",
        },
        {
          total_amount: 800.0,
          userID: 1,
          saleparameterID: 1,
          feetypeID: 1,
          businessID: 1,
          created_at: "2024-03-15",
        },
        {
          total_amount: 450.0,
          userID: 1,
          saleparameterID: 2,
          feetypeID: 2,
          businessID: 1,
          created_at: "2024-03-18",
        },
        {
          total_amount: 999.0,
          userID: 1,
          saleparameterID: 3,
          feetypeID: 3,
          businessID: 1,
          created_at: "2024-03-25",
        },
        {
          total_amount: 500.0,
          userID: 1,
          saleparameterID: 4,
          feetypeID: 4,
          businessID: 1,
          created_at: "2024-04-01",
        },
        {
          total_amount: 1050.0,
          userID: 1,
          saleparameterID: 5,
          feetypeID: 5,
          businessID: 1,
          created_at: "2024-04-05",
        },
        {
          total_amount: 725.0,
          userID: 1,
          saleparameterID: 6,
          feetypeID: 6,
          businessID: 1,
          created_at: "2024-04-10",
        },
        {
          total_amount: 890.0,
          userID: 1,
          saleparameterID: 1,
          feetypeID: 1,
          businessID: 1,
          created_at: "2024-04-15",
        },
        {
          total_amount: 1100.0,
          userID: 1,
          saleparameterID: 2,
          feetypeID: 2,
          businessID: 1,
          created_at: "2024-04-20",
        },
        {
          total_amount: 450.0,
          userID: 1,
          saleparameterID: 3,
          feetypeID: 3,
          businessID: 1,
          created_at: "2024-04-25",
        },
        {
          total_amount: 300.0,
          userID: 1,
          saleparameterID: 4,
          feetypeID: 4,
          businessID: 1,
          created_at: "2024-05-01",
        },
        {
          total_amount: 950.0,
          userID: 1,
          saleparameterID: 5,
          feetypeID: 5,
          businessID: 1,
          created_at: "2024-05-05",
        },
        {
          total_amount: 500.0,
          userID: 1,
          saleparameterID: 6,
          feetypeID: 6,
          businessID: 1,
          created_at: "2024-05-10",
        },
        {
          total_amount: 1200.0,
          userID: 1,
          saleparameterID: 1,
          feetypeID: 1,
          businessID: 1,
          created_at: "2024-05-15",
        },
        {
          total_amount: 650.0,
          userID: 1,
          saleparameterID: 2,
          feetypeID: 2,
          businessID: 1,
          created_at: "2024-05-20",
        },
        {
          total_amount: 999.99,
          userID: 1,
          saleparameterID: 3,
          feetypeID: 3,
          businessID: 1,
          created_at: "2024-05-25",
        },
        {
          total_amount: 750.75,
          userID: 1,
          saleparameterID: 4,
          feetypeID: 4,
          businessID: 1,
          created_at: "2024-06-01",
        },
        {
          total_amount: 900.0,
          userID: 1,
          saleparameterID: 5,
          feetypeID: 5,
          businessID: 1,
          created_at: "2024-06-05",
        },
        {
          total_amount: 800.0,
          userID: 1,
          saleparameterID: 6,
          feetypeID: 6,
          businessID: 1,
          created_at: "2024-06-10",
        },
      ]);
    });
};
