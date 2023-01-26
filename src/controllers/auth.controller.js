const { UsersDAO } = require('../models/server.models');
const { sign } = require('jsonwebtoken');

const users_db = new UsersDAO()

const getToken = ({name, mail}) => {
	const user = { name, mail }
	const secret = process.env.SECRET
	const options = { expiresIn: 3600 }
	const token = sign(user, secret, options)
	return token
}

const create = async (req, res, next) => {
	const userData = {
		... req.body,
		avatarURI: req.file.filename
	}
	try {
		const isMailDuplicated = await users_db.isMailDuplicated( userData.mail )
		if( isMailDuplicated ) throw new Error('400: Mail already used')
		else {
			const data = await users_db.create( userData );
			res.status(201).json(data);
		}
	}
	catch (error) { next(error) }
}

const validate = async (req, res, next) => {
	try {
		if(req.body.mail && req.body.password) {
			const user = await users_db.readByMail(req.body.mail);
			if( user.password === req.body.password) {
				const response = {
					status: 'Success',
					token: getToken(user)
				}
				res.status(200).json( response );
			}
			else throw new Error('401: Failed credential validation');
		}
		else throw new Error('400: Missing required property'); 
	}
	catch (error) { next(error) }
}

module.exports = {
	create,
	validate
}