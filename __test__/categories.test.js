const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const router = require('../routes/categories'); 

const app = express();
app.use(express.json());
app.use('/categories', router);

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

describe('POST /addCategory', () => {
  it('should create a new category and redirect to /inventory', async () => {
    const response = await request(app)
      .post('/categories/addCategory')
      .send({ nombre: 'Test Category', material: 'Test Material' });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/inventory');
  });

  it('should return 500 if there is an error', async () => {
    // Simula un error forzando una condición, como un campo requerido faltante
    const response = await request(app)
      .post('/categories/addCategory')
      .send({ nombre: '' }); // Falta el campo material

    expect(response.status).toBe(500);
    expect(response.text).toBe('error');
  });
});
