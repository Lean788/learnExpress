import dotenv from 'dotenv';
import express from 'express';
import {USERS_BBDD} from './bbdd.js';


dotenv.config();

const PORT = 3000;
const expressApp = express();

//Middleware: Es una función que se ejecuta para multiples endpoints.
expressApp.use(express.json());
expressApp.use(express.text()); 

// Obtener los detalles de una cuenta a partir del guid
expressApp.get('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const user = USERS_BBDD.find((user) => user.guid === guid);

    if(!user) return res.status(404).send();

    return res.send(user);
});
// Crear una nueva cuenta a partir del guid name
expressApp.post('/account', (req, res) => {
    const { guid, name } = req.body;

    if(!guid || !name) return res.state(400).send();

    const user = USERS_BBDD.find((user) => user.guid === guid);

    if(user) return res.status(409).send();

    USERS_BBDD.push({
        guid, name
    });

    return res.send();
});
//Actualizar el nombre de una cuenta
expressApp.path('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;

    if(!name) return res.state(400).send();

    const user = USERS_BBDD.find((user) => user.guid === guid);

    if(!user) res.status(404).send();

    user.name = name;

    return res.send();
});
// eliminar una cuenta
expressApp.delete('/account/:guid', (req, res) => {
    const { guid } = req.params;
    const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);

    if(!userIndex === -1) return res.status(404).send();
    USERS_BBDD.splice(userIndex, 1);

    return res.send();
});

expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`)
});
