const express =require('express')
const router = express.Router()

const {getallcountries,getallactivecountries,getCountryById,createCountry,updateCountry} = require('../controllers/locationscontroller');

// Ruta para obtener la lista de todos los paises.
router.get('/getallcountries',getallcountries);

// Ruta para obtener la lista de todos los paises activos.
router.get('/getallactivecountries',getallactivecountries);

// Ruta para obtener un detalle de pais.
router.get('/getcountry/:id',getCountryById);

// Ruta para crear un pais.
router.post('/countrycreate',createCountry);

// Ruta para actualizar un detalle de pais.
router.patch('/countryupdate/:id',updateCountry); 

module.exports = router;