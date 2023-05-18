const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {agregarServicio, obtenerServicios, actualizarServicio, eliminarServicio} = require('../controllers/servicio');

// Rutas
router.post('/agregar', validarJWT,agregarServicio);

router.get('/mostrar', obtenerServicios);


router.put('/editar/:id', actualizarServicio);

router.delete('/eliminar/:id', eliminarServicio);

module.exports = router;