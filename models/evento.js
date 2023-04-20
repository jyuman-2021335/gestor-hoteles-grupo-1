const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación del evento es obligatoria'],
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

module.exports = model('Evento', EventoSchema)