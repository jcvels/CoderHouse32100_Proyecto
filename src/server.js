const express = require('express');
const securer = require('./middlewares/securer.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const router = require('./router/server.router');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.use(securer);

server.use('/', express.static('public'));
server.use('/', router);

server.use(errorMiddleware);

module.exports = server;