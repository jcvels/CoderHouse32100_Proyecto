const { ProductsDAO } = require('../models/app.models');

const products_db = new ProductsDAO();

const create = async (req, res, next) => {
    try {
        const data = await products_db.create(req.body)
        res.status(201).json(data);
    }
    catch (error) { next(error) }
}

const list = async (req, res, next) => {
    try {
        const data = await products_db.read()
        res.status(200).json(data)
    }
    catch (error) { next(error) }
}

const listOne = async (req, res, next) => {
    try {
        const data = await products_db.read(req.params.id)
        res.status(200).json(data);
    }
    catch (error) { next(error) }
}

const update = async (req, res, next) => {
    try {
        const data = await products_db.update(req.params.id, req.body)
        res.status(200).json(data);
    } 
    catch (error) { next(error) }
}

const del = async (req, res, next) => {
    try {
        const data = await products_db.delete(req.params.id)
        res.status(200).json(data);
    }
    catch (error) { next(error) }
}

module.exports = {
    list,
    listOne,
    create,
    update,
    del
}