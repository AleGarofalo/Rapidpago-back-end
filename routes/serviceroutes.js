const express =require('express')
const router = express.Router()

const {asignService,unasignService,create,updateService,getallservices,getServicesbyUser,getSettingsbyService,asignforTerminal,unasignforTerminal,getServicesInCommon,asignforBank,unasignforBank} = require('../controllers/servicecontroller');

// Ruta para obtener la lista de todos los servicios     
router.get('/getallservices',getallservices);

// Ruta para obtener la lista de todos los servicios asociados a un usuario
router.get('/getservicesbyuser/:id', getServicesbyUser);

// Ruta para obtener la configuracion de un servicio asociado a un usuario
router.get('/getsettings', getSettingsbyService);

// Ruta para obtener la lista de todos los servicios comunes entre un terminal y un banco
router.get('/getincommon/:terminalID/:bankID', getServicesInCommon);

// Ruta para manejar el registro de servicios
router.post('/create',create );

// Ruta para manejar la actualizacion de servicio 
router.patch('/update/:id',updateService );

// Ruta para asignar un servicio a un usuario
router.post('/asign',asignService);

// Ruta para desasignar un servicio a un usuario
router.post('/unsasign',unasignService);

// Ruta para asignar un servicio a un terminal
router.post('/asignterminal',asignforTerminal);

// Ruta para desasignar un servicio a un terminal
router.post('/unasignterminal',unasignforTerminal);

// Ruta para asignar un servicio a un banco
router.post('/asignbank',asignforBank);

// Ruta para desasignar un servicio a un banco
router.post('/unasignbank',unasignforBank);

module.exports = router;