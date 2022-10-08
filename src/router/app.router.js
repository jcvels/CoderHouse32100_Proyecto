const router = require('express').Router();
const products_router = require('./products.router');
const cart_router = require('./cart.router');

router.use('/api/products', products_router);
// router.use('/api/cart', cart_router);


router.use('*', (req, res) => {
    const error_response = { error : -2, descripction: `La ruta '${req.baseUrl}' método ${req.method} no se encuentra implementada.` };
    res.status(404).send( JSON.stringify(error_response) );
})

module.exports = router;