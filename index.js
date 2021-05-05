const express = require('express');
const { dbConnection } = require('./database/config');
const cors= require('cors');
require('dotenv').config();

//crear el servidor de express
const app = express();
//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio público
//use es un midleware en express
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));





//escuchar peticiones
app.listen(process.env.PORT,()=>{//se ejecuta cuando se sube server
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});