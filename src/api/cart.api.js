const Datastorage = require('../classes/datastorage.class');
const Cart = require('../classes/cart.class');

const carts_db = new Datastorage('data/carts_data.json');
const products_db = new Datastorage('data/products_data.json');

const create = (req, res) => {
    const new_cart = new Cart({products:[]});
    carts_db.save( new_cart.getCart() )
        .then( data => res.status(201).send(data) )
        .catch( err => res.status(500).send(err) )
}

const del = (req, res) => {
    const id_zanitized = Number.parseInt(req.params.id);
    carts_db.deleteById(id_zanitized)
        .then( data => {
            if(data === true) res.status(200).send( { success: `El carrito id=${id_zanitized} fue eliminado correctamente.` } )
            else res.status(404).send( {error: 404, description: 'El carrito especificado no existe.' } )
        })
        .catch( err => res.status(500).send(err) )
}

const listProducts = (req, res) => {
    const id_zanitized = Number.parseInt(req.params.id);
    carts_db.getById(id_zanitized)
        .then( data => {
            if( data === null ) res.status(404).send( {error: 404, description: 'El carrito especificado no existe.' } )
            else if( data.products.length < 1 ) res.status(204).send(data.products);
            else res.status(200).send(data.products);
        })
        .catch( err => res.status(500).send(err) )
}

const addProduct = (req, res) => {
    const id_cart_zanitized = Number.parseInt(req.params.id); 
    const id_product_zanitized = Number.parseInt(req.params.id_prod); console.log(id_product_zanitized);
    products_db.getById(id_product_zanitized)
        .then( product_to_add => {
            if( product_to_add === null ) res.status(404).send( {error: 404, description: 'El producto especificado no existe.' } )
            else {
                carts_db.getById(id_cart_zanitized)
                    .then( data => {
                        if( data=== null ) res.status(404).send( {error: 404, description: 'El carrito especificado no existe.' } )
                        else if( data.products.findIndex( item => item.id === id_product_zanitized ) != -1 )
                            res.status(400).send( {error: 400, description: `El producto id=${id_product_zanitized} ya se encuantra en el carrito id=${id_cart_zanitized}. No es posible volver a agregarlo.` } )
                        else {
                            data.products.push( product_to_add )
                            carts_db.updateById(id_cart_zanitized, data)
                                .then( () => res.status(200).send( { success: `El producto id=${id_product_zanitized} fue agregado correctamente al carrito id=${id_cart_zanitized}.` } ) )
                                .catch( err => res.status(500).send(err) )
                        }
                    })
                    .catch( err => res.status(500).send(err) )
            }
        })
        .catch( err => res.status(500).send(err) )
}

const delProduct = (req, res) => {
    const id_cart_zanitized = Number.parseInt(req.params.id); 
    const id_product_zanitized = Number.parseInt(req.params.id_prod);
    carts_db.getById(id_cart_zanitized)
        .then( data => {
            if( data === null ) res.status(404).send( {error: 404, description: 'El carrito especificado no existe.' } )
            else if( data.products.length < 1 ) res.status(204).send( {error: 0, description: 'El carrito especificado no contiene productos.' } )
            else {
                let product_index = data.products.findIndex( item => item.id === id_product_zanitized );
                if( product_index > -1 ) {
                    data.products.splice(product_index,1);
                    carts_db.updateById(id_cart_zanitized, data)
                        .then( data => res.status(200).send( { success: `El producto id=${id_product_zanitized} fue eliminado correctamente del carrito id=${id_cart_zanitized}.` } ) )
                        .catch( err => res.status(500).send(err) )
                }
                else res.status(404).send( {error: 0, description: 'El producto especificado no existe en el carrito.' } )
            }
        })
        .catch( err => res.status(500).send(err) )
} 

module.exports = {
    create,
    del,
    listProducts,
    addProduct,
    delProduct
}