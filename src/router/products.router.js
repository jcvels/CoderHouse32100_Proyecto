const router = require('express').Router();
const api = require('../api/products.api');

router.get('/', api.list );
router.get('/:id', api.listOne );
router.post('/', api.create );
router.put('/:id', api.update );
router.delete('/:id', api.del );

module.exports = router;