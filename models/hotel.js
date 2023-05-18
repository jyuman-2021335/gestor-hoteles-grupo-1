

const { Schema, model } = require('mongoose');


const HotelSchema =  Schema({
    nombre: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    ciudad: {
      type: String,
      required: true
    },
    estrellas: {
      type: Number,
      default: 3
    },
    telefono: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true
    }
  });

module.exports = model('Hotel', HotelSchema);