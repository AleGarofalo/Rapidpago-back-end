exports.seed = function(knex) {
    // Array para almacenar los ítems
    const items = [];
  
    // Modelos con sus IDs (identificados por el orden en que se insertan en la tabla 'models')
    const models = [
    { id: 1, name: 'F20' },
    { id: 2, name: 'F300' },
    { id: 3, name: 'F310' },
    { id: 4, name: 'F600' },
    { id: 5, name: 'P2' },
    { id: 6, name: 'P2 Mini' },
    { id: 7, name: 'P2 LITE' },
    { id: 8, name: 'P2 PRO' },
    { id: 9, name: 'WISEPAD 2' },
    { id: 10, name: 'WISEPAD 2 PLUS' }
    ];
  
    // Número de items por modelo
    const itemsPerModel = 5;
  
    // Función para generar un serial aleatorio y forzarlo a ser string
    function generateSerial() {
      return 'SN' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    }
  
    // Recorrer los modelos y generar 5 ítems para cada uno
    models.forEach((model) => {
    for (let i = 0; i < itemsPerModel; i++) {
        items.push({
          serial: String(generateSerial()),  // Serial como string
          active: true,                      // Todos los items estarán activos
          userID: null,                      // Puede cambiarse por un ID de usuario real si es necesario
          modelID: model.id,                 // ID del modelo
          created_at: knex.fn.now()           // Fecha actual
        });
    }
    });
  
    // Insertar los ítems en la tabla 'items'
    return knex('items').del()
    .then(function() {
        return knex('items').insert(items);
    });
  };
  