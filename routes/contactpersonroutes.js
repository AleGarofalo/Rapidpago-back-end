const express =require('express')
const router = express.Router()

const {getAll,getByBusiness,getById,create,update,deleteContact,} = require('../controllers/contactpersoncontroller');

// Ruta para obtener la lista de todas las tarifas.
router.get('/getallcontacs',getAll);

// Ruta para obtener la lista de todas las tarifas activas.
router.get('/getbybusiness/:id',getByBusiness);

// Ruta para obtener un detalle de tarifa.
router.get('/getcontactperson/:id',getById);

// Ruta para crear una tarifa.
router.post('/create',create);

// Ruta para actualizar un detalle de tarifa.
router.patch('/update/:id',update); 

module.exports = router;