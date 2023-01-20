const express = require('express');
const securer = require('./middlewares/securer.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const router = require('./router/server.router');
const path = require('path');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }))

//server.use(securer);

server.use('/', express.static('src/public'));
server.use('/', router);

server.set('view engine','pug');
server.set('views', path.join(__dirname, './views'))

server.use(errorMiddleware);

module.exports = server;