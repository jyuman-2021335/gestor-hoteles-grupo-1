const { Schema, model } = require('mongoose');

const ReservacionSchema = Schema({
  habitacion: {
    type: Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
    required: true,
  },
 
});

module.exports = model('Reservacion', ReservacionSchema);