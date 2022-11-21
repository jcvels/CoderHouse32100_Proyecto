const { Schema } = require('mongoose');
const MongoContainer = require('../containers/mongo.container');

const collection = 'carts';
const productsSchema = new Schema({
    products: {type:Array}
},
{
    timestamps:true
});

class ProductsMongoDao extends MongoContainer {

    constructor() {
        super(collection, productsSchema);
    }

    async clear(id) {
        const updatedDocument = await this.model.updateOne(
            { _id:id },
            { $set:{ products:[] } }
        );
        if( updatedDocument.matchedCount === 0 ) throw 'Required document does not exist in our records';
        return updatedDocument;
    }

}

module.exports = ProductsMongoDao;