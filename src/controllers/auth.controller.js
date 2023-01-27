const { UsersDAO } = require('../models/server.models');
const { encrypt, validate } = require('../helpers/encryptor');
const { sign } = require('jsonwebtoken');

const users_db = new UsersDAO()

const getToken = ({name, mail}) => {

	const payload = { name, mail }
	const secret = process.env.SECRET
	const options = { expiresIn: 3600 }
	const token = sign(payload, secret, options)
	return token

}

const signUp = async (req, res, next) => {
	
	const { 
		name,
		mail,
		password,
		address,
		age,
		phone 
	} = req.body;
	
	const hash = await encrypt(password);

	const userData = {
		name,
		mail,
		password: hash,
		address,
		age,
		phone,
		avatarURI: ''
	}

	try {
		const isMailDuplicated = await users_db.isMailDuplicated( userData.mail )
		if( isMailDuplicated ) throw new Error('400: Mail already used')
		else {
			const data = await users_db.create( userData );
			data.password = undefined
			res.status(201).json(data);
		}
	}

	catch (error) {
		next(error)
	}

}

const signIn = async (req, res, next) => {

	const { 
		mail,
		password
	} = req.body;

	try {
		if( mail && password ) {
			const user = await users_db.readByMail(mail);
			const validation = await validate(password, user.password)

			if(validation) {
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

	catch (error) {
		next(error)
	}

}

module.exports = {
	signIn,
	signUp
}