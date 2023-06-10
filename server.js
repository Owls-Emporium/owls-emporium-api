const express = require('express');
require('dotenv').config();
var expressSession = require("express-session");
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer ({
    storage: multer.memoryStorage()
});

//ROUTES
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productRoutes');

 
app.use(expressSession({
    secret: "This is one hell of a secret",
    resave: false,
    saveUninitialized: false
  }));


//for debug
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port', process.env.PORT);


//calling routes
users(app,);
categories(app);
products(app, upload)

//public directory
app.use( express.static('public'));

//LISTENER
server.listen(process.env.PORT,() => {
    console.log('aplicacion de NodeJS '+'puerto ' + process.env.PORT + ' iniciada...')
})

    
//errors handler
app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
    });
    
module.exports = {
    app: app,
    server: server
}

//to run: npm run dev or nodemon server.js