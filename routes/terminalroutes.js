const express =require('express')
const router = express.Router()

const {create,update,getallTerminal,getTerminalByPOS,getTerminalBycategory,getTerminalByService,getServicesByTerminal,getAccountsByTerminal,getallterminalcategories,getallactiveterminalcategories,getTerminalCategory,updateCategory,registerCategory} = require('../controllers/terminalcontroller');

// Ruta para obtener la lista de todos los terminales 
router.get('/getallterminal',getallTerminal);

// Ruta para obtener la lista de todos los terminales pertenecientes a una categoria
router.get('/getallbycategory/:id',getTerminalBycategory);

// Ruta para obtener la lista de todos los terminales pertenecientes a un POS 
router.get('/getallbypos/:id',getTerminalByPOS);

// Ruta para obtener la lista de todos los terminales asociados a un servicio 
router.get('/getterminalbyservice/:id',getTerminalByService);

// Ruta para obtener la lista de todos los terminales pertenecientes a un POS 
router.get('/getservicesbyterminal/:id',getServicesByTerminal);

// Ruta para obtener la lista de todas las cuentas de banco asociadas a un terminal
router.get('/getaccountsbyterminal/:id',getAccountsByTerminal);

// Ruta para crear un negocio  
router.post('/create',create);

// Ruta para actualizar un negocio  
router.patch('/update/:id',update);

//------------------------------------------------------------------------------------------------------------//


// Ruta para obtener la lista de todas las categorias de terminales 
router.get('/getallcategories',getallterminalcategories);

// Ruta para obtener la lista de todas las categorias de terminales activos 
router.get('/getallactivecategories',getallactiveterminalcategories);

router.get('/getcategory/:id',getTerminalCategory);

// Ruta para actualizar una categoria de negocio  
router.patch('/updatecategory/:id',updateCategory);

// Ruta para crear una categoria de negocio  
router.post('/createcategory',registerCategory);

module.exports = router;