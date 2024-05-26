const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema( {
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    identificacion: {type: String, required: true},
    celular: {type: String, required: true},
    correo: {type: String, required: true},
    contraseña: {type: String, required: true},
    tipoUsuario: {type: String, required: true},
    image: {type: String, required: false},
    created: {type: Date, required: true, default: Date.now }
});

userSchema.pre('save', function(next){
    if(this.isNew || this.isModified('contraseña')){
        const document = this;

        bcrypt.hash(document.contraseña, saltRounds, (err, hashedPassword) => {
            if(err) {
                next(err);
            }else {
                document.contraseña = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

userSchema.methods.isCorrectPassword = function(contraseña, callback) {
    bcrypt.compare(contraseña, this.contraseña, function(err, result){
        if(err){
            return callback(err);
        }else {
            callback(null, result);
        }
    });
}

module.exports = mongoose.model('user', userSchema);