const express = require('express');
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

//RUTAS
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;


 
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
app.set('port', port);
//llamando a las rutas
users(app);


//modify the ip 192.168.1.21 ip a list
//maybe this is the error
server.listen(3000,'192.168.1.21', function(){
    console.log('aplicacion de NodeJS '+'puerto ' + port + ' iniciada...')
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

//control c to finish nodemon
