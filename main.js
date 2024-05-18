
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

//imports
const routes = require('./routes/routes');
const user = require('./routes/user');
const categories = require('./routes/categories');
const specs = require('./routes/specs');
const subcategories = require('./routes/subcategories');


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
app.use(routes);
app.use(user);
app.use(categories);
app.use(subcategories);
app.use(specs);

//test
/* routes(app);
user(app);
categories(app);
subcategories(app);
specs(app); */



// set template engine
app.set('view engine', 'ejs');


//connect PORT
app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});