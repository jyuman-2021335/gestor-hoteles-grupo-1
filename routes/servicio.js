const { Router } = require('express');

const {agregarServicio, obtenerServicios, actualizarServicio, eliminarServicio} = require('../controllers/servicio');

const router = Router();

// Rutas
router.post('/agregar', agregarServicio);

router.get('/mostrar', obtenerServicios);


router.put('/editar/:id', actualizarServicio);

router.delete('/eliminar/:id', eliminarServicio);

module.exports = router;