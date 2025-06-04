const express =require('express')
const router = express.Router()

const {getallstates,getallactivestates,getStateById,createState,updateState,getstatesbycountry} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todos los estados.
router.get('/getallstates',getallstates);

// Ruta para obtener la lista de todos los estados.
router.get('/getallactivestates',getallactivestates);

// Ruta para obtener un detalle de estado.
router.get('/getstate/:id',getStateById);

// Ruta para crear un estado.
router.post('/statecreate',createState);

// Ruta para actualizar un detalle de estado.
router.patch('/stateupdate/:id',updateState);

// Ruta para obtener la lista de todos los estados para un pais
router.get('/getstatesbycountry/:id',getstatesbycountry);

module.exports = router;