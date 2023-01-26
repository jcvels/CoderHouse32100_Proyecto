const router = require('express').Router();
const { login, signup, main } = require('../../controllers/views.controller');

router.use('/signup', signup );
router.use('/login', login );
router.use('/', main );

module.exports = router;