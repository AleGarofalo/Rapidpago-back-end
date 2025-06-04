const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

// Crear el pool de conexiones usando la configuración exportada de keys.js
const pool = mysql.createPool(database);

// Promisificar métodos del pool de conexiones
pool.query = promisify(pool.query).bind(pool);
pool.getConnection = promisify(pool.getConnection).bind(pool);

// Manejar errores de conexión del pool
pool.getConnection()
  .then(connection => {
    connection.release();
    console.log('DB is Connected');
  })
  .catch(error => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('La conexión con la base de datos fue cerrada.');
    } else if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene demasiadas conexiones.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('La conexión a la base de datos fue rechazada.');
    } else {
      console.error('Error al intentar conectar con la base de datos:', error.message);
    }
    process.exit(1); // Terminar el proceso si hay un error de conexión
  });

// Exportar el pool de conexiones promisificado para usarlo en otras partes de la aplicación
module.exports = pool;