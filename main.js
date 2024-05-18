//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 4000;


//database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));


//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


//Routes
app.use(require('./routes/routes'));
app.use(require('./routes/user'));
app.use(require('./routes/categories'));
app.use(require('./routes/specs'));
app.use(require('./routes/subcategories'));


// set template engine
app.set('view engine', 'ejs');


//connect PORT
app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});