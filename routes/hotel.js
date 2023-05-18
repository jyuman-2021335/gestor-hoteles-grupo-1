//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const {mostrarHoteles, agregarHotel, editarHotel, eliminarHotel, getHabitacionesByHotel } = require('../controllers/hotel');
<<<<<<< Updated upstream
=======
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole } = require('../middlewares/validar-roles');
>>>>>>> Stashed changes

const router = Router();

router.get('/mostrar', mostrarHoteles);

<<<<<<< Updated upstream
router.post('/agregar', agregarHotel);

router.put('/editar/:id', editarHotel);

router.delete('/eliminar/:id', eliminarHotel);
=======
router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria para el post').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria para el post').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos,
    validarJWT,
    esAdminRole
] , agregarHotel);

router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , editarHotel);

router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    esAdminRole
] , eliminarHotel);
>>>>>>> Stashed changes


router.get('/:id/habitaciones', getHabitacionesByHotel);

module.exports = router;