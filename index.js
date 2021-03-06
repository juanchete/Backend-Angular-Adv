const express = require('express');
require('dotenv').config();

const cors = require('cors')
const{dbConnection} = require('./database/config')
//Crear servidos

const app =express()

//Configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'))

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/todo', require('./routes/busquedas'))
app.use('/api/login', require('./routes/auth'))


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+process.env.PORT);
} );
