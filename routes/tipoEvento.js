const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {crearTipoEvento, obtenerTipoEventos,actualizarTipoEvento,eliminarTipoEvento} = require('../controllers/tipoEvento');

// Rutas
router.post('/agregar', validarJWT,crearTipoEvento);

router.get('/mostrar', obtenerTipoEventos);


router.put('/editar/:id', actualizarTipoEvento);

router.delete('/eliminar/:id', eliminarTipoEvento);

module.exports = router;