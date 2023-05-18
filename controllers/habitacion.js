//Importaciones
const { response, request } = require('express');

//Modelos
const Habitacion = require('../models/habitacion');


const getHabitaciones = async (req = request, res = response) => {

    const query = {};
    const listaHabitaciones = await Promise.all([
        Habitacion.countDocuments(query),
        Habitacion.find(query)
    ]);

    res.json({
        msg: 'GET API Habitaciones',
        listaHabitaciones
    });

}

const postHabitacion = async (req = request, res = response) => {

    const {capacidad, precio, descripcion, hotel } = req.body;
    const habitacionDB = new Habitacion({   capacidad, precio, descripcion, hotel });

    //Guardar en la base de datos
    await habitacionDB.save();

    res.status(201).json({
        msg: 'POST API Habitación',
        habitacionDB
    });

}

const putHabitacion= async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    //Editar y guardar
    const habitacionEditada = await Habitacion.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API Habitacion',
        habitacionEditada
    });

}


const deleteHabitacion= async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar fisicamente y guardar
    const habitacionEliminada = await Habitacion.findByIdAndDelete(id);
    //const habitacionEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API Habitacion',
        habitacionEliminada
    });

}

module.exports = {
    getHabitaciones,
    postHabitacion,
    putHabitacion,
    deleteHabitacion
}