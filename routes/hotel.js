
//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const {mostrarHoteles, agregarHotel, editarHotel, eliminarHotel, getHabitacionesByHotel } = require('../controllers/hotel');



const router = Router();

router.get('/mostrar', mostrarHoteles);
router.post('/agregar', validarJWT,agregarHotel);
router.put('/editar/:id', editarHotel);
router.delete('/eliminar/:id', eliminarHotel);
router.get('/:id/habitaciones', getHabitacionesByHotel);

module.exports = router;