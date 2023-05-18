//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { agregarEvento, editarEvento, mostrarEventos, eliminarEvento} = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', mostrarEventos);

router.post('/agregar', [
    check('nombre', 'El nombre del evento es obligatorio').not().isEmpty(),
   
    
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
    validarJWT
] , agregarEvento);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('ubicacion', 'la ubicacion del evento es obligatoria').not().isEmpty(),
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not(),
    editarEvento
], editarEvento);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
] ,eliminarEvento);


module.exports = router;