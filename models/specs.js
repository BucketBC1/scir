const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
    categoria: { type: String },
    material: { type: String },
    subcategoria: { type: String },
    diametro: { type: String },
    cantidad: { type: Number },
    longitud: { type: Number },
    codigo: { type: String, required: true }
});

module.exports = mongoose.model('spec', specSchema);