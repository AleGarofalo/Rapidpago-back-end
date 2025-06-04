const express =require('express')
const router = express.Router()

const {getallsectors,getallactivesectors,getsectorbyid,createSector,updateSector,deleteSector,} = require('../controllers/locationscontroller');

/*--------------------------------------------------------------------------------------*/
// Ruta para obtener la lista de todos los sectores de industria 
router.get('/getallsectors',getallsectors);

// Ruta para obtener la lista de todos los sectores de industria activos 
router.get('/getallactivesectors',getallactivesectors);

// Ruta para obtener un detalle de sector 
router.get('/getsector/:id',getsectorbyid);

// Ruta para crear un sector.
router.post('/sectorcreate',createSector);

// Ruta para actualizar un detalle de ciudad.
router.patch('/sectorupdate/:id',updateSector); 


//------------------------------------------------------------------------------------------------------------//

module.exports = router;

