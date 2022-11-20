const { Schema } = require('mongoose');
const MongoContainer = require('../containers/mongo.container');

const collection = 'products';
const productsSchema = new Schema({
    name: {type:String},
    description: {type:String},
    code: {type:String},
    price: {type:Number},
    thumbnail: {type:String},
    stock: {type:Number},
},
{
    timestamps:true
});

class ProductsMongoDao extends MongoContainer {

    constructor() {
        super(collection, productsSchema);
    }

}

module.exports = ProductsMongoDao;