//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getEventos, postEvento, putEvento, deleteEvento} = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getEventos);

router.post('/agregar', [
    check('nombre', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('ubicacion', 'la ubicacion del evento es obligatoria').not().isEmpty(),
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
] , postEvento);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('ubicacion', 'la ubicacion del evento es obligatoria').not().isEmpty(),
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not(),
    validarCampos
], putEvento);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
] ,deleteEvento);


module.exports = router;