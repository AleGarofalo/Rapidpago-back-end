
const express = require('express')
const router = express.Router()

/*
const userRouter = require('./user');

// Aquí puedes agregar más rutas en el futuro si es necesario
router.use('/users', userRouter);
*/

//RENDERIZA LA PAGINA PRINCIPAL CON LA RUTA PREDESTINADA
router.get('/',(req,res)=> {
    res.send('PRINCIPIO DE LA APP')
})

module.exports = router