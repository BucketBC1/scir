const express = require('express');
const cateSchema = require('../models/categories');
const router = express.Router();

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

router.post("/addCategory", (req, res) => {
    let { nombre, material } = req.body;

    nombre = capitalizeFirstLetter(nombre);

    const category = new cateSchema({ nombre, material});

    category.save()
        .then(() => {

            res.redirect('/inventory');
        })
        .catch(error => {
            console.error('Error al agregar categoría', error);
            res.status(500).send('error');
        });
});


exports.getCategories = async (req, res) => {
    try {
        const categories = await categories.find();
        res.render('nombre', { nombre });
    } catch (error) {
        res.status(500).json({error: true, message: error.message});
    }

};





module.exports = router;