const express = require('express');
const router = express.Router();

/* ====== modelos ===== */
const Categories = require('../models/categories');
const Specs = require('../models/specs');
const Sub = require('../models/subcategories');
const { error } = require('jquery');
/* ====== modelos ===== */


router.get('/',  (req, res, ) => {
    res.render('index', { title: 'Home Page' })
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registro'})
});

router.get('/login', (req, res) => {
    res.render('login', {title: 'login'})
});





/* ==== Inventory ==== */
router.get('/inventory', async (req, res, next) => {
    try {
        if (req.session.loggedIn) {
            const categories = await Categories.find({});
            const specs = await Specs.find({});
            const sub = await Sub.find({});

            res.render('inventory', { title: 'SCIR', categories, specs, sub });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

/* ==== Eliminar dato ==== */
router.get('/delete', async(req, res, next) => {
    try {
        if (req.session.loggedIn) {
            const idToDelete = req.query.id;
            await Specs.findByIdAndDelete(idToDelete);
            res.redirect('/inventory');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});
/* ==== Eliminar dato ==== */


/* ==== Actualizar ==== */
router.get('/get-element/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const spec = await Specs.findById(id);
        if (!spec) {
            return res.status(404).json({error: 'Elemento no encontrado' });
        }

        return res.status(200).json(spec);
    } catch (error) {
        console.error('Error al obtener los datos del elemento', error);
        return res.status(500).json({ error: 'Error interno del servidor'});
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subcategoria, diametro, cantidad, longitud, codigo } = req.body;

        // Actualiza los campos del documento
        const updatedSpec = await Specs.findByIdAndUpdate(
            id,
            { subcategoria, diametro, cantidad, longitud, codigo },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedSpec) {
            console.log(!updatedSpec);
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }
        return res.redirect('/inventory');
    } catch (error) {
        console.error('Error al actualizar el elemento:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
/* ==== Actualizar dato ==== */
/* ==== Inventory ==== */





router.get('/notifications', (req, res) => {
    res.render('notifications', {title: 'Notificaciones'})
});

router.get('/request', (req, res) => {
    res.render('request', {title: 'Requerimientos'})
});

router.get('/suppliers', (req, res) => {
    res.render('suppliers', {title: 'Proveedores'})
});


module.exports = router;