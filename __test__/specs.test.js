const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const router = require('../routes/specs');

const app = express();
app.use(express.json());
app.use('/specs', router); 

let mongoServer;

beforeAll(async () => {
  // Crear una instancia de MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Conectarse a la base de datos en memoria
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Desconectar y detener el servidor de MongoDB en memoria
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /addSpec', () => {
  it('should create a new spec and redirect to /inventory', async () => {
    const response = await request(app)
      .post('/specs/addSpec')
      .send({
        dato: 'Test Category - Test Material',
        subcategoria: 'Subcategory',
        diametro: 10,
        cantidad: 100,
        longitud: 20,
        codigo: '123ABC'
      });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/inventory');
  });

  it('should return 500 if there is an error', async () => {
    // Simula un error forzando una condición, como un campo requerido faltante
    const response = await request(app)
      .post('/specs/addSpec')
      .send({
        dato: 'Test Category - Test Material',
        subcategoria: 'Subcategory',
        // diametro, cantidad, longitud y codigo están faltando
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Error');
  });
});
