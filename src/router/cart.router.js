const router = require('express').Router();
const api = require('../api/cart.api');

router.post('/', api.create );
router.delete('/:id', api.del );
router.get('/:id/products', api.listProducts );
router.post('/:id/products/:id_prod', api.addProduct );
router.delete('/:id/products/:id_prod', api.delProduct );

module.exports = router;