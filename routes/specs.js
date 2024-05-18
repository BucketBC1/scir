const express = require('express');
const specSchema = require('../models/specs');
const router = express.Router();


router.post("/addSpec", async (req, res) => {
    const { dato, subcategoria, diametro, cantidad, longitud, codigo } = req.body;

    try {

        const [nombre, material ] = dato.split(' - ');

        const spec = new specSchema({ categoria: nombre, material, subcategoria, diametro, cantidad, longitud, codigo });
        await spec.save();
        
        res.redirect('/inventory');
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error');
    }
});







module.exports = router;