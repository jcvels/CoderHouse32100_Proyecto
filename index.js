const express = require('express');
const securer = require('./middlewares/securer');
const router = require('./router/app.router');

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.use(securer);

server.use('/', express.static('src/public'));
server.use('/', router);

server.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> ${data.method} --> ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )