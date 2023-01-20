const { UsersDAO } = require('../models/server.models');

const users_db = new UsersDAO()

const create = async (req, res, next) => {
	try {
		const userData = req.body;
		userData.avatarURI = req.file.filename;

		const isMailDuplicated = await users_db.isMailDuplicated( userData.mail )

		if( isMailDuplicated ) throw new Error( 'Mail already used: 400')
		else {
			const data = await users_db.create( userData );
			res.status(201).json(data);
		}
	}
	catch (error) { next(error) }
}

const test = (req, res, next) => {
  try {
    const reply = { message : "Here we will manage the user authorization." };
    res.status(201).json(reply);
  }
  catch (error) { next(error) }
}

module.exports = {
  test,
	create
}