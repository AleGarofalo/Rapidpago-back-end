const express =require('express')
const router = express.Router()

const {    getAllSalePayments,getSalePaymentById,getSalePaymentsBySaleId,createSalePayment,updateSalePayment,deleteSalePayment,} = require('../controllers/salepaymentcontroller');

// Ruta para obtener la lista de todas los pagos de venta.
router.get('/getallsalespayments',getAllSalePayments);

// Ruta para obtener un detalle de pagos por id.
router.get('/getpayments/:id',getSalePaymentById);

// Ruta para obtener un detalle de pagos por id de venta.
router.get('/getpaymentsbysale/:id',getSalePaymentsBySaleId);

// Ruta para crear un pago de venta.
router.post('/create',createSalePayment);

// Ruta para actualizar un detalle de pago de venta.
router.patch('/update/:id',updateSalePayment); 

module.exports = router;