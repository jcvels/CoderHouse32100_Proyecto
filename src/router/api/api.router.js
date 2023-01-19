const router = require('express').Router();
const products_router = require('./products.router');
const cart_router = require('./cart.router');

router.use('/products', products_router);
router.use('/cart', cart_router);

module.exports = router;