const { Router } = require('express');
const { crearFactura } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Generar factura
router.post('/generar' , crearFactura);

module.exports = router;