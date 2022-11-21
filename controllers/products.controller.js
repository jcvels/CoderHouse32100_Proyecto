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
        const id_zanitized = Number.parseInt(req.params.id);
        const data = await products_db.read(id_zanitized)
        res.status(200).json(data);
    }
    catch (error) { next(error) }
}

const update = async (req, res, next) => {
    try {
        const id_zanitized = Number.parseInt(req.params.id);
        const data = await products_db.update(id_zanitized, req.body)
        res.status(200).json(data);
    } 
    catch (error) { next(error) }
}

const del = async (req, res, next) => {
    try {
        const id_zanitized = Number.parseInt(req.params.id);
        const data = await products_db.delete(id_zanitized)
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