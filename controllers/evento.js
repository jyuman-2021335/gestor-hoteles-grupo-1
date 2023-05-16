const { response, request } = require('express');
const Evento = require('../models/Evento');
const TipoEvento = require('../models/tipoEvento');
const Hotel = require('../models/hotel');

// Mostrar todos los eventos
const mostrarEventos = async (req, res) => {
    try {
        const eventos = await Evento.find().populate('tipoEvento').populate('hotel');
        res.json({
            ok: true,
            eventos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar los eventos'
        });
    }
}

// Agregar un evento
const agregarEvento = async (req, res) => {
    const evento = new Evento(req.body);
    try {
        // Verificar si el tipoEvento existe
        const tipoEventoExiste = await TipoEvento.findById(evento.tipoEvento);
        if (!tipoEventoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo de evento no existe en la base de datos'
            });
        }

        // Verificar si el hotel existe
        const hotelExiste = await Hotel.findById(evento.hotel);
        if (!hotelExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El hotel no existe en la base de datos'
            });
        }

        // Guardar el evento en la base de datos
        await evento.save();
        res.json({
            ok: true,
            evento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al agregar el evento'
        });
    }
}

// Editar un evento
const editarEvento = async (req, res) => {
    const eventoId = req.params.id;
    try {
        // Verificar si el evento existe
        const eventoExiste = await Evento.findById(eventoId);
        if (!eventoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El evento no existe en la base de datos'
            });
        }

        // Verificar si el tipoEvento existe
        const tipoEventoExiste = await TipoEvento.findById(req.body.tipoEvento);
        if (!tipoEventoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo de evento no existe en la base de datos'
            });
        }

        // Verificar si el hotel existe
        const hotelExiste = await Hotel.findById(req.body.hotel);
        if (!hotelExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El hotel no existe en la base de datos'
            });
        }

        // Actualizar el evento en la base de datos
        const nuevoEvento = await Evento.findByIdAndUpdate(eventoId, req.body, { new: true });
        res.json({
            ok: true,
            evento: nuevoEvento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el evento'
        });
    }
}
  
  const eliminarEvento = async (req = request, res = response) => {
    const eventoId = req.params.id;
    const hotelId = req.params.hotelId;
    try {
      const evento = await Evento.findOneAndDelete({
        _id: eventoId,
        hotel: hotelId
      });
      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: 'Evento no encontrado'
        });
      }
      res.json({
        ok: true,
        msg: 'Evento eliminado'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar el evento'
      });
    }
  };
  
 
  
  module.exports = {
    mostrarEventos,
    agregarEvento,
    editarEvento, eliminarEvento
  };