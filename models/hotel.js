const { Schema, model } = require('mongoose');


const HotelSchema =  Schema({
    nombre: {
        type: String
    },
    direccion: {
        type: String
    },
    ciudad: {
        type: String
    },
    correo: {
        type: String
    }
  });

module.exports = model('Hotel', HotelSchema);