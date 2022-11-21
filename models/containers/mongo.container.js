const mongoose = require('mongoose');
const mongoConfig = require('../../config/datasources.config').mongo;

class MongoContainer {

    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema);
    }

    static async connect() {
        await mongoose.connect(mongoConfig.uri);
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

    async create(data_to_save) {
        const newDocument = new this.model(data_to_save);
        return await newDocument.save();
    }
     
    async read( id = null ) {
        if(id === null ) {
            const documents = await this.model.find().lean();
            return documents;
        }
        else {
            const document = await this.model.findOne({_id:id});
            if(!document) throw new Error('Required document does not exist in our records');
            return document;
        }
    }

    async update(id, data_to_save) {
        const updatedDocument = await this.model.updateOne(
            {_id:id},
            {$set:{ ... data_to_save }}
        );
        if( updatedDocument.matchedCount === 0 ) throw new Error('Required document does not exist in our records');
        return updatedDocument;
    }

    async delete(id) {
        return this.model.deleteOne({_id:id});
    }

}

module.exports = MongoContainer;