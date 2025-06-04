const express =require('express')
const router = express.Router()

const {getAllParishes,getAllactiveParishes,getParishById,createParish,updateParish,getparishesbymunicipality} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todas las parroquias.
router.get('/getallparishes',getAllParishes);

// Ruta para obtener la lista de todas las parroquias activas.
router.get('/getallactiveparishes',getAllactiveParishes);

// Ruta para obtener un detalle de parroquia
router.get('/getparish/:id',getParishById);

// Ruta para obtener la lista de todas las parroquias para un municipio
router.get('/getparishesbymunicipality/:id',getparishesbymunicipality);

// Ruta para crear una ciudad.
router.post('/parishcreate',createParish);

// Ruta para actualizar un detalle de ciudad.
router.patch('/parishupdate/:id',updateParish); 

module.exports = router;