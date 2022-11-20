const Datastorage = require('../classes/datastorage.class');
const Product = require('../classes/product.class');

const products_db = new Datastorage('data/products_data.json');

const list = (req, res) => {
    products_db.getAll()
        .then( data => res.status(200).send(data) )
        .catch( err => res.status(500).send(err) )
}

const listOne = (req, res) => {
    const id_zanitized = Number.parseInt(req.params.id);
    products_db.getById(id_zanitized)
        .then( data => {
            if( data === null ) res.status(204).send(data);
            else res.status(200).send(data);
        })
        .catch( err => res.status(500).send(err) )
}

const create = (req, res) => {
    const new_product = new Product(req.body);
    products_db.save( new_product.getProduct() )
        .then( data => res.status(201).send(data) )
        .catch( err => res.status(500).send(err) )    
}

const update = (req, res) => {
    const id_zanitized = Number.parseInt(req.params.id);
    req.body.id = id_zanitized;
    const updated_product = new Product(req.body);
    products_db.updateById( id_zanitized, updated_product.getProduct() )
        .then( data => {
            if( data === null ) res.status(404).send(data);
            else res.status(200).send(data);
        })
        .catch( err => res.status(500).send(err) )
}

const del = (req, res) => {
    const id_zanitized = Number.parseInt(req.params.id);
    products_db.deleteById(id_zanitized)
        .then( data => {
            if(data === true) res.status(200).send()
            else res.status(404).send()
        })
        .catch( err => res.status(500).send(err) )
}

module.exports = {
    list,
    listOne,
    create,
    update,
    del
}