const express =require('express')
const router = express.Router()

const {getallcities,getallactivecities,getCityById,createCity,updateCity,getcitiesbystate} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todos las ciudades.
router.get('/getallcities',getallcities);

// Ruta para obtener la lista de todos las ciudades activas.
router.get('/getallactivecities',getallactivecities);

// Ruta para obtener la lista de todos las ciudades activas.
router.get('/getcity/:id',getCityById);

// Ruta para obtener la lista de todas las ciudades para un estado
router.get('/getcitiesbystate/:id',getcitiesbystate);

// Ruta para crear una ciudad.
router.post('/citycreate',createCity);

// Ruta para actualizar un detalle de ciudad.
router.patch('/cityupdate/:id',updateCity); 

module.exports = router;