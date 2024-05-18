const express = require('express');
const subSchema = require('../models/subcategories');
const router = express.Router();


router.post("/addSub", async (req, res) => {
    const {categoria, nombre} = req.body;

    try {

        const sub = new subSchema({ categoria, nombre});
        await sub.save();
        res.redirect('/inventory');
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Error');
    }
});

module.exports = router;