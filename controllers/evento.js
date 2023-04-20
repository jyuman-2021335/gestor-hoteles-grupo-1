//Importaciones
const { response, request } = require('express');

//Modelos
const Eventos = require('../models/evento');


const getEventos = async (req = request, res = response) => {

    const query = {};
    const listaEventos = await Promise.all([
        Eventos.countDocuments(query),
        Eventos.find(query)
    ]);

    res.json({
        msg: 'GET API Eventos',
        listaEventos
    });

}

const postEvento = async (req = request, res = response) => {

    const { nombre, ubicacion, capacidad, descripcion, precio} = req.body;
    const eventoDB = new Eventos({ nombre, ubicacion, capacidad, descripcion, precio });

    //Guardar en la base de datos
    await eventoDB.save();

    res.status(201).json({
        msg: 'POST API Evento',
        eventoDB
    });

}

const putEvento = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    //Editar y guardar
    const eventoEditado = await Eventos.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API Evento',
        eventoEditado
    });

}


const deleteEvento = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar fisicamente y guardar
    const eventoEliminado = await Eventos.findByIdAndDelete(id);
    //const eventoEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API Evento',
        eventoEliminado
    });

}

module.exports = {
    getEventos,
    postEvento,
    putEvento,
    deleteEvento
}