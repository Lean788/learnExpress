import dotenv from 'dotenv';


dotenv.config();

const PORT = 3000;
const express = require('express');
const expressApp = express();

//Middleware: Es una función que se ejecuta para multiples endpoints.
expressApp.use(express.json());
expressApp.use(express.text());

// Obtener los detalles de una cuenta

// Crear una nueva cuenta

//Actualizar una cuenta

// eliminar una cuenta


expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`)
});
