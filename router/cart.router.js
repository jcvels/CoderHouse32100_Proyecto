const router = require('express').Router();
const cartsController = require('../controllers/carts.controller');

router.get('/:id/products', cartsController.listProducts );
router.post('/', cartsController.create );
router.post('/:id/products/:id_prod', cartsController.addProduct );
router.delete('/:id', cartsController.del );
router.delete('/:id/products/:id_prod', cartsController.delProduct );

module.exports = router;