module.exports.seed = async function(knex) {
    await knex('users_businesses').del();
  
    // Obtener los usuarios y business_entities
    const users = await knex('users').select('id').orderBy('id', 'asc');
    const businessEntities = await knex('business_entities').select('id').orderBy('id', 'asc');
  
    // Preparamos las inserciones
    const userBusinessRelations = [];
    for (let i = 2; i < users.length; i++) { // Comenzamos desde el tercer usuario, porque los primeros 2 ya están
      userBusinessRelations.push({
        userID: users[i].id,
        business_entity_id: businessEntities[i - 2].id, // Empieza en el primer `business_entity_id`
        created_at: new Date(),
        updated_at: null
      });
    }
  
    // Insertar las relaciones
    await knex('users_businesses').insert(userBusinessRelations);
  };