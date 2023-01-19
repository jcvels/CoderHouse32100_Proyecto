const router = require('express').Router();
const productsController = require('../../controllers/products.controller');

router.get('/', productsController.list );
router.get('/:id', productsController.listOne );
router.post('/', productsController.create );
router.put('/:id', productsController.update );
router.delete('/:id', productsController.del );

module.exports = router;