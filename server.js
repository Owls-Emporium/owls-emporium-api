const express = require('express');
//building server
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors')

//RUTAS
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;


//for debug
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

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
