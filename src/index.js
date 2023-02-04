require('dotenv').config()

const { server } = require('./server');
const port = process.env.PORT || 8080;

server.listen(port)
	.on('listening', () => {

		console.log(`--> listening port ${port}.`)

		if (process.env.DATASOURCE === 'mongo') {
			const Mongo = require('./models/containers/mongo.container')
			Mongo.connect().then(() => console.log('--> connected to MongoDB.'))
		}

	})
	.on('request', (data) => console.log(`--> new ${data.method} request to ${data.url}`))
	.on('error', (err) => console.log(`--> ${err}`))