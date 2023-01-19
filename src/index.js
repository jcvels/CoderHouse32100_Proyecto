const express = require('express');
const securer = require('../../middlewares/securer.middleware');
const errorMiddleware = require('../../middlewares/error.middleware');
const router = require('./router/app.router');

require('dotenv').config()

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.use(securer);

server.use('/', express.static('public'));
server.use('/', router);

server.use(errorMiddleware);

server.listen(port)
	.on('listening', () => {
		console.log(`--> listening port ${port}.`)

		if (process.env.DATASOURCE === 'mongo') {
			const Mongo = require('../../models/containers/mongo.container')
			Mongo.connect().then(() => console.log('--> connected to MongoDB.'))
		}

	})
	.on('request', (data) => console.log(`--> new ${data.method} request to ${data.url}`))
	.on('error', (err) => console.log(`--> ${err}`))