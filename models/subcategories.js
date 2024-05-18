const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    nombre: {type: String, required: true}
});

module.exports = mongoose.model('subcategory', subSchema);
