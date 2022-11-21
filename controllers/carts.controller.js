const { ProductsDAO, CartsDAO } = require('../models/app.models');

const carts_db = new CartsDAO();
const products_db = new ProductsDAO();

const create = async (req, res, next) => {
    try {
        const data = await carts_db.create(req.body)
        res.status(201).json(data);
    }
    catch (error) { next(error) }
}

const del = async (req, res, next) => {
    try {
        const data = await carts_db.delete(req.params.id);
        res.status(200).json(data);
    }
    catch (error) { next(error) }
}

const listProducts = async (req, res, next) => {
    try {
        const data = await carts_db.read(req.params.id);
        res.status(200).json(data.products);
    }
    catch (error) { next(error) }
}

const addProduct = async (req, res, next) => {
    try {
        const cart_to_update = await carts_db.read(req.params.id);
        const product_to_add = await products_db.read(req.params.id_prod);
        cart_to_update.products.push( product_to_add );
        const data = await carts_db.update(req.params.id, cart_to_update);
        res.status(200).json(data);
    }
    catch (error) { next(error) }
}

const delProduct = async (req, res, next) => {
    try {
        const cart_to_update = await carts_db.read(req.params.id);
        const product_index = cart_to_update.products.findIndex( item => item._id == req.params.id_prod ); console.log(product_index);
        if( product_index === -1 ) throw new Error('Product is not in the cart.');
        cart_to_update.products.splice(product_index, 1); console.log(updated_cart);
        const data = await carts_db.update(req.params.id, cart_to_update);
        res.status(200).json(data);
    }
    catch (error) { next(error) }
} 

module.exports = {
    create,
    del,
    listProducts,
    addProduct,
    delProduct
}