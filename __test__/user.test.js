const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const router = require('../routes/user');

const app = express();
app.use(express.json());
app.use('/user', router);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('POST /register', () => {
    it('should create a new user and send an status 200', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({ nombres: 'pru.nombre', apellidos: 'pru.apelldos', identificacion: 'pru.23322', celular: 'pru.34122', correo: 'el@sdsa', contraseña: 'elpipas', tipoUsuario: 'usuario'   });
        
        expect(response.status).toBe(200);
    });

    it('should return 500 if there is an error', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({ nombres: '' });

        expect(response.status).toBe(500);
    });
});