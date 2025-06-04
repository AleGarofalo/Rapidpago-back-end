const express =require('express')
const router = express.Router()

const { register, update, getallbusinesses,getallactivebusinesses,getBusinessesByParent,getBusinessesByCategory,getAccountsByBusiness,getallbusinessescategories,getallactivebusinessescategories,getBusinessCategory,updateCategory,registerCategory} = require('../controllers/businesscontroller');

// Ruta para obtener la lista de todos los negocios 
router.get('/getallbusiness',getallbusinesses);

// Ruta para obtener la lista de todos los negocios activos
router.get('/getallactivebusiness',getallactivebusinesses);

// Ruta para obtener la lista de todos los negocios pertenecientes a un padre 
router.get('/getallbyparent/:id',getBusinessesByParent);

// Ruta para obtener la lista de todos los negocios pertenecientes a una categoria 
router.get('/getallbycategory/:id',getBusinessesByCategory);

// Ruta para obtener la lista de todas las cuentas de banco pertenecientes a un negocio 
router.get('/getallaccounts/:id',getAccountsByBusiness);

// Ruta para crear un negocio  
router.post('/create',register);

// Ruta para actualizar un negocio  
router.patch('/update/:id',update);

//------------------------------------------------------------------------------------------------------------//

// Ruta para obtener la lista de todas las categorias de negocio 
router.get('/getallcategories',getallbusinessescategories);

// Ruta para obtener la lista de todas las categorias de negocio activas
router.get('/getallactivecategories',getallactivebusinessescategories);

router.get('/getcategory/:id',getBusinessCategory);

// Ruta para actualizar una categoria de negocio  
router.patch('/updatecategory/:id',updateCategory);

// Ruta para crear una categoria de negocio  
router.post('/createcategory',registerCategory);

module.exports = router;