const { response, request } = require('express');

const TipoEvento  = require('../models/tipoEvento');

const obtenerTipoEventos = async (req = request, res = response) => {
    try {
      const tipoEventos = await TipoEvento.find();
      res.json({
        ok: true,
        tipoEventos,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener los tipos de eventos',
      });
    }
  };
  
  const crearTipoEvento = async (req = request, res = response) => {
    const tipoEvento = new TipoEvento(req.body);
    try {
      const tipoEventoGuardado = await tipoEvento.save();
      res.json({
        ok: true,
        tipoEvento: tipoEventoGuardado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al crear el tipo de evento',
      });
    }
  };
  
  const actualizarTipoEvento = async (req = request, res = response) => {
    const { id } = req.params;
    try {
      const tipoEventoActualizado = await TipoEvento.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.json({
        ok: true,
        tipoEvento: tipoEventoActualizado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al actualizar el tipo de evento',
      });
    }
  };
  
  const eliminarTipoEvento = async (req = request, res = response) => {
    const { id } = req.params;
    try {
      await TipoEvento.findByIdAndDelete(id);
      res.json({
        ok: true,
        msg: 'Tipo de evento eliminado',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar el tipo de evento',
      });
    }
  };
  
  module.exports = {
    obtenerTipoEventos,
    crearTipoEvento,
    actualizarTipoEvento,
    eliminarTipoEvento,
  };