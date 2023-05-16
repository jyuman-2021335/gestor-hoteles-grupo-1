const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: Number,
        default: 0
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Habitacion'
    }
});

module.exports = model('Servicio', ServicioSchema);