require('dotenv').config()

let ProductsDAO;
let CartsDAO;

switch(process.env.DATASOURCE) {
    case 'mongo':
        ProductsDAO = require('./daos/products.mongo.dao');
        CartsDAO = require('./daos/carts.mongo.dao');
        break;
    default:
        throw new Error(`Invalid Datasource. DATASOURCE=${process.env.DATASOURCE}. Do must select a valid option.`);
}

module.exports ={
    ProductsDAO,
    CartsDAO
}