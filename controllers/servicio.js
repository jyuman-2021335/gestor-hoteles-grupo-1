// controllers/servicios.js

const Servicio = require('../models/servicio');

const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.json({
            ok: true,
            servicios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los servicios'
        });
    }
}

const agregarServicio = async (req, res) => {
    const servicio = new Servicio(req.body);
    try {
        await servicio.save();
        res.json({
            ok: true,
            servicio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al agregar el servicio'
        });
    }
}

const actualizarServicio = async (req, res) => {
    const id = req.params.id;
    try {
        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: 'Servicio no encontrado'
            });
        }
        const cambiosServicio = {
            ...req.body,
            habitacion: servicio.habitacion
        };
        const servicioActualizado = await Servicio.findByIdAndUpdate(id, cambiosServicio, { new: true });
        res.json({
            ok: true,
            servicio: servicioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el servicio'
        });
    }
}

const eliminarServicio = async (req, res) => {
    const id = req.params.id;
    try {
        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: 'Servicio no encontrado'
            });
        }
        await Servicio.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Servicio eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el servicio'
        });
    }
}

module.exports = {
    obtenerServicios,
    agregarServicio,
    actualizarServicio,
    eliminarServicio
}