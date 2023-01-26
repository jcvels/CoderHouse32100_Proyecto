const express = require('express');
const server = express();
const path = require('path');
const router = require('./router/server.router');
const { securer: securerMiddleware } = require('./middlewares/securer.middleware');
const { errorMiddleware } = require('./middlewares/error.middleware');

server.set('view engine', 'pug');
server.set('views', path.join(__dirname, './views'))

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(securerMiddleware);
server.use('/', express.static('src/public'));
server.use('/', router);
server.use(errorMiddleware);

module.exports = {
	server
};