const express =require('express')
const router = express.Router()

const {getAllModels,getAllActiveModels,getModelById,createModel,updateModel,deleteModel,} = require('../controllers/modelcontroller');

// Ruta para obtener la lista de todas las monedas.
router.get('/getallmodels',getAllModels);

// Ruta para obtener la lista de todas las monedas activos.
router.get('/getallactivemodels',getAllActiveModels);

// Ruta para obtener un detalle de modelo.
router.get('/getmodel/:id',getModelById);

// Ruta para crear un modelo.
router.post('/create',createModel);

// Ruta para actualizar un detalle de modelo.
router.patch('/update/:id',updateModel); 

module.exports = router;