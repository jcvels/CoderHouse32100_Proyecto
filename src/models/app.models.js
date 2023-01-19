require('dotenv').config()

let ProductsDAO;
let CartsDAO;

switch(process.env.DATASOURCE) {
    case 'mongo':
        ProductsDAO = require('./daos/products.mongo.dao');
        CartsDAO = require('./daos/carts.mongo.dao');
        break;
    case 'firebase':
        ProductsDAO= require('./daos/products.firebase.dao');
        CartsDAO = require('./daos/carts.firebase.dao');
        break;
    default:
        throw new Error(`Invalid Datasource. DATASOURCE=${process.env.DATASOURCE}. Do must select 'mongo' or 'firebase'.`);
}

module.exports ={
    ProductsDAO,
    CartsDAO
}