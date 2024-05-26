const express = require('express');
const session = require('express-session');
const userSchema = require('../models/user');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.post("/register", (req, res) => {
    const {nombres, apellidos, identificacion, celular, correo, contraseña, tipoUsuario} = req.body;

    const user = new userSchema({nombres, apellidos, identificacion, celular, correo, contraseña, tipoUsuario, image: ''});

    user.save()
    .then(() => {
        req.session.user = {
            type: 'success',
            message: '¡Usuario registrado exitosamente!'
        };
        res.redirect('/register');
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
                req.session.user = {
                _id: usuario._id,
                nombres: usuario.nombres,
                correo: usuario.correo,
                image: usuario.image
            };

                req.session.loggedIn = true;
                res.redirect('/inventory');
                
            } else {
                res.status(500).send('Correo y/o contraseña incorrecta');
            }
        });
    })
    .catch(err => {
        res.status(500).send('Error al autenticar al usuario');
    });
});



/* === image === */

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Usuario no autenticado'});
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ningún archivo'});
        }

        const imagePath = path.join('uploads', req.file.filename);
    

        const updatedUser = await userSchema.findByIdAndUpdate(req.session.user._id, {
            image: imagePath
        }, { new: true });


        req.session.user = updatedUser;

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir la imagen'});
    }
});
/* === image === */




module.exports = router;
