const { Router } = require('express');
const router = Router();
<<<<<<< Updated upstream

const {crearTipoEvento, obtenerTipoEventos,actualizarTipoEvento,eliminarTipoEvento} = require('../controllers/tipoEvento');

// Rutas
router.post('/agregar', crearTipoEvento);
=======
const { check } = require('express-validator');

const {crearTipoEvento, obtenerTipoEventos,actualizarTipoEvento,eliminarTipoEvento} = require('../controllers/tipoEvento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

// Rutas
router.post('/agregar', [
    check('nombre', 'El Tipo de evento es obligatorio para el post').not().isEmpty(),
    validarJWT,
    esAdminRole
] , crearTipoEvento);
>>>>>>> Stashed changes

router.get('/mostrar', obtenerTipoEventos);


<<<<<<< Updated upstream
router.put('/editar/:id', actualizarTipoEvento);

router.delete('/eliminar/:id', eliminarTipoEvento);
=======
router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , actualizarTipoEvento);

router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , eliminarTipoEvento);
>>>>>>> Stashed changes

module.exports = router;