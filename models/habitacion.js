const { Schema, model } = require('mongoose');

const HabitacionSchema = Schema({
    
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    capacidad: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        default: 0
    },
  
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    }
});

module.exports = model('Habitacion', HabitacionSchema)