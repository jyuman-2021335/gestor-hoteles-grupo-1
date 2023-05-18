//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

<<<<<<< Updated upstream
const { crearReservacion, editarReservacion, eliminarReservacion, mostrarReservaciones} = require('../controllers/reservacion');
  
  // Crear una nueva reservación
  router.post('/agregar', crearReservacion);
  
  // Editar una reservación existente
  router.put('/editar/:id', editarReservacion);
  
  // Eliminar una reservación existente
  router.delete('/cancelar/:id', eliminarReservacion);
  
  // Mostrar todas las reservaciones existentes
  router.get('/mostrar', mostrarReservaciones);
  
  module.exports = router;
=======
const { crearReservacion, editarReservacion, eliminarReservacion, mostrarReservaciones } = require('../controllers/reservacion');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

// Crear una nueva reservación
router.post('/agregar', [
  check('nombre', 'La reservación es obligatoria para el post').not().isEmpty(),
  check('fecha', 'La fecha de inicio es obligatoria para el post').not().isEmpty(),
  check('fecha', 'La fecha de fin es obligatoria para el post').not().isEmpty(),
  validarJWT
], crearReservacion);

// Editar una reservación existente
router.put('/editar/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  validarJWT
], editarReservacion);

// Eliminar una reservación existente
router.delete('/cancelar/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  validarJWT
], eliminarReservacion);

// Mostrar todas las reservaciones existentes
router.get('/mostrar', [
  validarJWT,
  esAdminRole
], mostrarReservaciones);

module.exports = router;
>>>>>>> Stashed changes
