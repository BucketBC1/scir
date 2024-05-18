const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    material: {type: String}
});


module.exports = mongoose.model('category', cateSchema);