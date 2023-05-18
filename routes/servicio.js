const { Router } = require('express');
<<<<<<< Updated upstream

const {agregarServicio, obtenerServicios, actualizarServicio, eliminarServicio} = require('../controllers/servicio');
=======
const { check } = require('express-validator');

const {agregarServicio, obtenerServicios, actualizarServicio, eliminarServicio} = require('../controllers/servicio');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
>>>>>>> Stashed changes

const router = Router();

// Rutas
<<<<<<< Updated upstream
router.post('/agregar', agregarServicio);
=======
router.post('/agregar', [
    check('nombre', 'El Servicio es obligatorio para el post').not().isEmpty(),
    check('precio', 'El precio es obligatorio para el post').not().isEmpty(),
    validarJWT,
    esAdminRole
] , agregarServicio);
>>>>>>> Stashed changes

router.get('/mostrar', obtenerServicios);


<<<<<<< Updated upstream
router.put('/editar/:id', actualizarServicio);

router.delete('/eliminar/:id', eliminarServicio);
=======
router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , actualizarServicio);

router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , eliminarServicio);
>>>>>>> Stashed changes

module.exports = router;