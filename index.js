const express = require('express');
const securer = require('./middlewares/securer.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const router = require('./router/app.router');

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.use(securer);

server.use('/', express.static('src/public'));
server.use('/', router);

server.use(errorMiddleware)

server.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> new ${data.method} request to ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )