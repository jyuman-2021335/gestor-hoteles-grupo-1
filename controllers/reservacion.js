const { response, request } = require('express');

const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/habitacion');

const crearReservacion = async (req = request, res = response) => {
  const { habitacion, fecha_inicio, fecha_fin, huespedes } = req.body;

  // Verificar que la habitación existe
  const habitacionExiste = await Habitacion.findById(habitacion);
  if (!habitacionExiste) {
    return res.status(404).json({
      ok: false,
      msg: 'La habitación no existe'
    });
  }

  // Crear la reservación
  const reservacion = new Reservacion(req.body);

  // Guardar la reservación en la base de datos
  await reservacion.save();

  res.status(201).json({
    ok: true,
    reservacion
  });
};

const editarReservacion = async (req = request, res = response) => {
  const { id } = req.params;
  const { habitacion, fecha_inicio, fecha_fin, huespedes } = req.body;

  // Verificar que la reservación existe
  const reservacionExiste = await Reservacion.findById(id);
  if (!reservacionExiste) {
    return res.status(404).json({
      ok: false,
      msg: 'La reservación no existe'
    });
  }

  // Verificar que la habitación existe
  const habitacionExiste = await Habitacion.findById(habitacion);
  if (!habitacionExiste) {
    return res.status(404).json({
      ok: false,
      msg: 'La habitación no existe'
    });
  }

  // Actualizar la reservación en la base de datos
  const reservacionActualizada = await Reservacion.findByIdAndUpdate(
    id,
    { habitacion, fecha_inicio, fecha_fin, huespedes },
    { new: true }
  );

  res.json({
    ok: true,
    reservacion: reservacionActualizada
  });
};

const eliminarReservacion = async (req = request, res = response) => {
  const { id } = req.params;

  // Verificar que la reservación existe
  const reservacionExiste = await Reservacion.findById(id);
  if (!reservacionExiste) {
    return res.status(404).json({
      ok: false,
      msg: 'La reservación no existe'
    });
  }

  // Eliminar la reservación de la base de datos
  await Reservacion.findByIdAndDelete(id);

  res.json({
    ok: true,
    msg: 'Reservación eliminada'
  });
};

const mostrarReservaciones = async (req = request, res = response) => {
  const reservaciones = await Reservacion.find().populate('habitacion');

  res.json({
    ok: true,
    reservaciones
  });
};

module.exports = {
  crearReservacion,
  editarReservacion,
  eliminarReservacion,
  mostrarReservaciones
};