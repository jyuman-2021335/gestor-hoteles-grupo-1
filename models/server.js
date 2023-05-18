//Configuración del server
//Importaciones básicas
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){
        //Variables de configuración
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuarioPath = '/api/usuarios';
        this.habitacionPath = '/api/habitaciones';
        this.eventoPath = '/api/eventos';
        this.hotelPath = '/api/hotel'
        this.reservacionPath = '/api/reservacion'
        this.tipoEventoPath = '/api/tipoEvento'
        this.serviciosPath = '/api/servicios'
        this.facturaPath = '/api/factura'

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();

    }


    //Metodo de conección a Mongo
    async conectarDB(){
        await dbConection();
    }

    
    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico del proyecto
        this.app.use(  express.static('public') );

    }


    routes(){
        this.app.use( this.authPath , require('../routes/auth') );
        this.app.use( this.usuarioPath , require('../routes/usuario') );
        this.app.use( this.habitacionPath , require('../routes/habitacion') );
        this.app.use( this.eventoPath , require('../routes/evento') );
        this.app.use( this.hotelPath , require('../routes/hotel') );
        this.app.use( this.reservacionPath , require('../routes/reservacion') );
        this.app.use( this.tipoEventoPath , require('../routes/tipoEvento') );
        this.app.use( this.serviciosPath , require('../routes/servicio') );
        this.app.use( this.facturaPath , require('../routes/factura') );
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }


}

module.exports = Server;