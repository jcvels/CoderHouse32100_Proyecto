require('dotenv').config()

let ProductsDAO;
let CartsDAO;
let UsersDAO;

switch(process.env.DATASOURCE) {
    case 'mongo':
        ProductsDAO = require('./daos/products.mongo.dao');
        CartsDAO = require('./daos/carts.mongo.dao');
        UsersDAO = require('./daos/users.mongo.dao');
        break;
    default:
        throw new Error(`Invalid Datasource. DATASOURCE=${process.env.DATASOURCE}. You must select a valid option.`);
}

module.exports ={
    ProductsDAO,
    CartsDAO,
    UsersDAO
}