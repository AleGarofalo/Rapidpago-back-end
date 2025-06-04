const express =require('express')
const router = express.Router()

const {getAllMotives,getAllActiveMotives,getMotiveById,createMotive,updateMotive,deleteMotive,} = require('../controllers/motivecontroller');

// Ruta para obtener la lista de todas las monedas.
router.get('/getallmotives',getAllMotives);

// Ruta para obtener la lista de todas las monedas activos.
router.get('/getallactivemotives',getAllActiveMotives);

// Ruta para obtener un detalle de moneda.
router.get('/getmotive/:id',getMotiveById);

// Ruta para crear una moneda.
router.post('/create',createMotive);

// Ruta para actualizar un detalle de moneda.
router.patch('/update/:id',updateMotive); 

module.exports = router;