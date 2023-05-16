//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getHabitaciones, postHabitacion, putHabitacion, deleteHabitacion} = require('../controllers/habitacion');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getHabitaciones);

router.post('/agregar', [
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
] , postHabitacion);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
], putHabitacion);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
] ,deleteHabitacion);


module.exports = router;