const express =require('express')
const router = express.Router()

const {getAllItems,getItemById,createItem,updateItem,deleteItem,} = require('../controllers/itemcontroller');

// Ruta para obtener la lista de todos los items.
router.get('/getallitems',getAllItems);

// Ruta para obtener un detalle de item.
router.get('/getitem/:id',getItemById);

// Ruta para crear un item.
router.post('/create',createItem);

// Ruta para actualizar un detalle de item.
router.patch('/update/:id',updateItem); 

module.exports = router;