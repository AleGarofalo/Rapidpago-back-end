const express =require('express')
const router = express.Router()

const {create,getallPOS,update,getPOSByBusiness,getPOSBycategory,getallposcategories,getallactiveposcategories,getPOSCategory,updateCategory,registerCategory} = require('../controllers/pointsalecontroller');

// Ruta para obtener la lista de todos los POS 
router.get('/getallpos',getallPOS);

// Ruta para obtener la lista de todos los POS pertenecientes a una categoria
router.get('/getallbycategory/:id',getPOSBycategory);

// Ruta para obtener la lista de todos los POS pertenecientes a un negocio 
router.get('/getallbybusiness/:id',getPOSByBusiness);

// Ruta para crear un negocio  
router.post('/create',create);

// Ruta para actualizar un negocio  
router.patch('/update/:id',update);

//------------------------------------------------------------------------------------------------------------//


// Ruta para obtener la lista de todas las categorias de POS 
router.get('/getallcategories',getallposcategories);

// Ruta para obtener la lista de todas las categorias de POS activas
router.get('/getallactivecategories',getallactiveposcategories);

router.patch('/getcategory/:id',getPOSCategory);

// Ruta para actualizar una categoria de POS  
router.patch('/updatecategory/:id',updateCategory);

// Ruta para crear una categoria de POS  
router.post('/createcategory',registerCategory);


module.exports = router;