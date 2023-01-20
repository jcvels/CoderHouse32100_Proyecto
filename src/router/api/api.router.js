const router = require('express').Router();
const products_router = require('./products.router');
const cart_router = require('./cart.router');
const auth_router = require('./auth.router');

router.use('/products', products_router);
router.use('/cart', cart_router);
router.use('/auth', auth_router);

module.exports = router;