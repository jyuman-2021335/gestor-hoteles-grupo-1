//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

<<<<<<< Updated upstream
const registroUsuario = async (req = request, res = response) => {

    const { nombre, correo, password} = req.body;
    const registerUser = new Usuario({ nombre, correo, password});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    registerUser.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await registerUser.save();

    res.status(201).json({
        msg: 'Registro de usuario',
        registerUser
    });

=======
const registerUsuarios = async (req = request, res = response) => {
    const {nombre, correo, password} = req.body;
    const usuarioRegistrado = new Usuario({nombre, correo, password});
    const salt = bcryptjs.genSaltSync();
    usuarioRegistrado.password = bcryptjs.hashSync(password, salt); 
    await usuarioRegistrado.save();

    res.status(201).json({
        msg: 'Nuevo cliente registrado',
        usuarioRegistrado  
    })
>>>>>>> Stashed changes
}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado, google, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });

}


const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuario',
        usuarioEliminado
    });

}

const putUsuarioPerfil = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    const usuarioId = usuario.toString();

    if (id === usuarioId) {
        const { _id, rol, ...resto } = req.body;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, { new: true });
        res.status(200).json({
            msg: 'PUT API perfil de usuarios',
            usuarioEditado
        })
    } else {
        res.status(401).json({
            msg: 'Solo puedes editar tu perfil >:('

        })
    }

}

const deleteUsuarioPerfil = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    const idUsuario = usuario.toString();

    if (id === idUsuario) {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'DELETE API perfil de usuarios',
            usuarioEliminado
        })
    } else {
        res.status(401).json({
            msg: 'Solo puedes eliminar tu perfil >:('

        })
    }

}

module.exports = {
    getUsuarios,
    postUsuario,
    registroUsuario,
    putUsuario,
    deleteUsuario,
    registerUsuarios,
    putUsuarioPerfil,
    deleteUsuarioPerfil
}