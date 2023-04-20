const { Schema, model } = require('mongoose');

const HabitacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de habitación es obligatoria'],
    },
    capacidad: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
});

module.exports = model('Habitacion', HabitacionSchema)