const express =require('express')
const router = express.Router()
const {json} = require('express')
const pool = require('../database')
const {createRole, listRoles, updateRole,getbyid} = require('../controllers/rolescontroller');


// Ruta para obtener la lista de todos los roles 
router.get('/getallroles',listRoles);

// Ruta para obtener la lista de todos los usuarios 
router.get('/getbyid/:id',getbyid);

// Ruta para manejar el registro de un rol
router.post('/create',createRole );

// Ruta para actualizar los datos de un usuario  
router.patch('/update/:id',updateRole)


module.exports = router;