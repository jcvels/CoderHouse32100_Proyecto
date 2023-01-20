const { Schema } = require('mongoose');
const MongoContainer = require('../containers/mongo.container');

const collection = 'users';
const productsSchema = new Schema({
	name: { type: String },
	mail: { type: String },
	password: { type: String },
	addess: { type: String },
	age: { type: Number },
	phone: { type: String },
	avatarURI: { type: String },
},
	{
		timestamps: true
	});

class UsersMongoDao extends MongoContainer {

	constructor() {
		super(collection, productsSchema);
	}

	async isMailDuplicated(mail=null) {
		if (mail === null) throw new Error('Mail is required')
		else {
			const document = await this.model.findOne({ mail: mail });
			if (!document) return false
			else return true
		}
	}	

	async readByMail(mail=null) {
		if (mail === null) throw new Error('Mail is required');
		else {
			const document = await this.model.findOne({ mail: mail });
			if (!document) throw new Error('Required document does not exist in our records');
			return document;
		}
	}

}

module.exports = UsersMongoDao;