const { Schema, model } = require("mongoose");

const TipoEventoSchema = Schema({
    tipo: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    }
})

module.exports = model('TipoEvento', TipoEventoSchema);
