//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarEventos, agregarEvento, editarEvento, eliminarEvento} = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', mostrarEventos);

router.post('/agregar', [
    check('nombre', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
] , agregarEvento);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('descripcion', 'La descripcion es obligatoria').not(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
], editarEvento);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
] ,eliminarEvento);


module.exports = router;