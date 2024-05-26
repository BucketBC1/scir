const express = require('express');
const subSchema = require('../models/subcategories');
const router = express.Router();

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

router.post("/addSub", async (req, res) => {
    let { nombre } = req.body;

    nombre = capitalizeFirstLetter(nombre);

    try {
        const sub = new subSchema({ nombre });
        await sub.save();
        res.redirect('/inventory');
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error');
    }
});

module.exports = router;