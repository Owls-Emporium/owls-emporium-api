const express = require('express');
//building server
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3001;


//for debug
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.disable('x-powered-by');
app.set('port', port);

//modify the ip
//maybe this is the error
server.listen(3001,'192.168.1.21' || 'localhost', function(){
    console.log('aplicacion de NodeJS '+'puerto ' + port + ' iniciada...')
})





//control c to finish nodemon