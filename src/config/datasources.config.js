module.exports = {
	mongo: {
		uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authMechanism=DEFAULT&authSource=admin`
	}
}