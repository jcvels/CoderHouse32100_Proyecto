const Datastorage = require('../classes/datastorage.class');
const Product = require('../classes/product.class');

const products_db = new Datastorage('data/products_data.json');

const list = () => {
    return products_db.getAll();
}

const listOne = (id) => {
    const id_zanitized = Number.parseInt(id);
    return products_db.getById(id_zanitized);
}

const create = (data) => {
    const new_product = new Product(data);
    return products_db.save( new_product.getProduct() )
}

const update = (id, data) => {
    const id_zanitized = Number.parseInt(id);
    data.id = id_zanitized;
    const updated_product = new Product(data);
    return products_db.updateById( id_zanitized, updated_product.getProduct() )
}

const del = (id) => {
    const id_zanitized = Number.parseInt(id);
    return products_db.deleteById(id_zanitized);
}

module.exports = {
    list,
    listOne,
    create,
    update,
    del
}