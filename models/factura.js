const { Schema, model } = require('mongoose');

const FacturaSchema = Schema({
  evento: {
    type: Schema.Types.ObjectId,
    ref: 'Evento',
    required: true,
  },
  habitacion: {
    type: Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true,
  },
  reserva: {
    type: Schema.Types.ObjectId,
    ref: 'Reservacion',
    required: true,
  },
  servicios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Servicio',
    },
  ],
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Factura', FacturaSchema);