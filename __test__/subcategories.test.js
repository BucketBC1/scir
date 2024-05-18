const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')
const router = require('../routes/subcategories');

const app = express();
app.use(express.json());
app.use('/subcategories', router);

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

describe('POST /addSub', () => {
    it('should create a new subcategory and redirect to /inventory', async () => {
        const response = await request(app)
            .post('/subcategories/addSub')
            .send({ categoria: 'category', nombre: 'test sub' });

        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/inventory');
    });

    it('should return 500 if there is an error', async () => {
        const response = await request(app)
            .post('/subcategories/addSub')
            .send({ nombre: '' });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error');;
    });
});