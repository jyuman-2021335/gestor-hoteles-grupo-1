const Factura = require('../models/factura');
const Evento = require('../models/evento');
const Habitacion = require('../models/habitacion');
const Reserva = require('../models/Reservacion');
const Servicio = require('../models/servicio');
const Usuario = require('../models/usuario');



const crearFactura = async (req, res) => {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { eventoId, habitacionId, reservaId, serviciosId, usuarioId } = req.body;
  
      // Obtener el precio y nombre del evento
      const evento = await Evento.findById(eventoId);
      const precioEvento = evento.precio;
      const nombreEvento = evento.nombre;
  
      // Obtener el precio y nombre de la habitación
      const habitacion = await Habitacion.findById(habitacionId);
      const precioHabitacion = habitacion.precio;
      const nombreHabitacion = habitacion.descripcion;
  
      // Obtener el precio y nombre de la reserva
      const reserva = await Reserva.findById(reservaId);
      const precioReserva = reserva.total;
      const nombreReserva = reserva.descripcion;
  
      // Obtener los precios y nombres de los servicios
      const servicios = await Servicio.find({ _id: { $in: serviciosId } });
      const preciosServicios = servicios.map(servicio => servicio.precio);
      const nombresServicios = servicios.map(servicio => servicio.nombre);

    const usuario = await Usuario.findById(usuarioId);
    const nombreUsuario = usuario.nombre;
  
      // Calcular el total sumando los precios de evento, habitación, reserva y servicios
      const total = precioEvento + precioHabitacion + precioReserva + preciosServicios.reduce((accumulator, current) => accumulator + current, 0);
  
      // Crear una nueva instancia de Factura
      const factura = new Factura({
        evento: eventoId,
        habitacion: habitacionId,
        reserva: reservaId,
        servicios: serviciosId,
        usuario: usuarioId,
        total,
      });
  
      // Guardar la factura en la base de datos
      await factura.save();
      
      const respuesta = {
        evento: nombreEvento,
        habitacion: nombreHabitacion,
        reserva: nombreReserva,
        servicios: nombresServicios,
        usuario: nombreUsuario,
        total: total,
        fecha: factura.fecha,
      };

      res.status(201).json({ success: true, data: respuesta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al crear la factura' });
    }
  };
  
  module.exports = { crearFactura };
  