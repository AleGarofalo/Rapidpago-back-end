const express =require('express')
const router = express.Router()

const {getAllMunicipalities,getAllactiveMunicipalities,getMunicipalityById,getmunicipalitiesbystate,createMunicipality,updateMunicipality} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todos los municipios.
router.get('/getallmunicipalities',getAllMunicipalities);

// Ruta para obtener la lista de todos los municipios activos.
router.get('/getallactivemunicipalities',getAllactiveMunicipalities);

// Ruta para obtener la lista de todos los municipios activos.
router.get('/getmunicipality/:id',getMunicipalityById);

// Ruta para obtener la lista de todos los municipios para un estado
router.get('/getmunicipalitiesbystate/:id',getmunicipalitiesbystate);

// Ruta para crear un municipio.
router.post('/municipalitycreate',createMunicipality);

// Ruta para actualizar un detalle de municipio.
router.patch('/municipalityupdate/:id',updateMunicipality); 

module.exports = router;