const express =require('express')
const router = express.Router()

const {getallindustries,getallactiveindustries,getIndustryTypeById,createIndustryType,updateIndustryType,deleteIndustryType,getindustriesbysector} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todas las industrias
router.get('/getallindustries',getallindustries);

// Ruta para obtener la lista de todas las industrias activas
router.get('/getallactiveindustries',getallactiveindustries);

// Ruta para obtener un detalle de tipo de industria 
router.get('/getindustry/:id',getIndustryTypeById);

// Ruta para obtener la lista de todas las industrias pertenecientes a un sector 
router.get('/getindustriesbysector/:id',getindustriesbysector);

// Ruta para crear un tipo de industria.
router.post('/industrycreate',createIndustryType);

// Ruta para actualizar un detalle de ciudad.
router.patch('/industryupdate/:id',updateIndustryType); 

module.exports = router;
