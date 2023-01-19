const router = require('express').Router();
const cartsController = require('../../controllers/carts.controller');

router.post('/', cartsController.create );
router.delete('/:id', cartsController.del );
router.get('/:id/products', cartsController.listProducts );
router.post('/:id/products/:id_prod', cartsController.addProduct );
router.delete('/:id/products/:id_prod', cartsController.delProduct );

module.exports = router;