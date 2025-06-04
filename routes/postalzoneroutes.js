const express =require('express')
const router = express.Router()

const {getAllPostalZones,getAllactivePostalZones,getPostalZoneById,createPostalZone,updatePostalZone,getpostalzonesbyparish} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todas las zonas postales.
router.get('/getallpostalzones',getAllPostalZones);

// Ruta para obtener la lista de todas las zonas postales activas.
router.get('/getallactivepostalzones',getAllactivePostalZones);

// Ruta para obtener un detalle de zona postal
router.get('/getpostalzone/:id',getPostalZoneById);

// Ruta para obtener la lista de todas las zonas postales para una parroquia
router.get('/getpostalzonesbyparish/:id',getpostalzonesbyparish);

// Ruta para crear una zona postal.
router.post('/postalzonecreate',createPostalZone);

// Ruta para actualizar un detalle de zona postal.
router.patch('/postalzoneupdate/:id',updatePostalZone); 

module.exports = router;