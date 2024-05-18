const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

router.post("/register", (req, res) => {
    const {nombres, apellidos, identificacion, celular, correo, contraseña, tipoUsuario} = req.body;

    const user = new userSchema({nombres, apellidos, identificacion, celular, correo, contraseña, tipoUsuario});

    user.save()
    .then(() => {
        res.status(200).send('Usuario registrado');
    })
    .catch(error => {
        console.error('Error al registrar usuario', error);
        res.status(500).send('Error al registrar el usuario');
    });
});

router.post("/login", (req, res) => {
    const {correo, password} = req.body;
    userSchema.findOne({correo})
    .then(usuario => {
        if(!usuario) {
            return res.status(500).send('El correo no existe');
        }

        usuario.isCorrectPassword(password, function(err, result) {
            if (err) {
                return res.status(500).send('Error al autenticar');
            }
            if (result) {

                req.session.loggedIn = true;
                res.redirect('/inventory');
                
            }else {
                res.status(500).send('Correo y/o contraseña incorrecta');
            }
        });
    })
    .catch(err => {
        res.status(500).send('Error al autenticar al usuario');
    });
});



module.exports = router;
