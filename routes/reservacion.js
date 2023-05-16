//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

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