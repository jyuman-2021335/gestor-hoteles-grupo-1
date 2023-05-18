const { response, request } = require('express');

const Hotel = require('../models/hotel');

const Habitacion = require('../models/habitacion');


const mostrarHoteles = (req, res) => {
    Hotel.find((err, hoteles) => {
      if (err) return res.status(500).send({ error: 'Error en la consulta de hoteles' });
      res.send(hoteles);
    });
  };
  
  // Agregar un nuevo hotel
  const agregarHotel = (req, res) => {
    const hotel = new Hotel({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      estrellas: req.body.estrellas,
      telefono: req.body.telefono,
      correo: req.body.correo
    });
    hotel.save((err, hotel) => {
      if (err) return res.status(500).send({ error: 'Error al crear el hotel' });
      res.send(hotel);
    });
  };
  
  // Editar un hotel existente
  const editarHotel = (req, res) => {
    Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, hotel) => {
      if (err) return res.status(500).send({ error: 'Error al actualizar el hotel' });
      res.send(hotel);
    });
  };
  
  // Eliminar un hotel existente
  const eliminarHotel = (req, res) => {
    Hotel.findByIdAndRemove(req.params.id, (err, hotel) => {
      if (err) return res.status(500).send({ error: 'Error al eliminar el hotel' });
      res.send(hotel);
    });
  };

  const getHabitacionesByHotel = async (req = request, res = response) => {
    const { id } = req.params;
  
    const habitaciones = await Habitacion.find({ hotel: id });
  
    res.json({
      msg: `GET API Habitaciones del Hotel ${id}`,
      habitaciones,
    });
  };

  module.exports = {
    mostrarHoteles, 
    agregarHotel,
    editarHotel, 
    eliminarHotel,
    getHabitacionesByHotel
  };