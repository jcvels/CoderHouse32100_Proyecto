const router = require('express').Router();
const { login, signup } = require('../../controllers/views.controller');

router.use('/login', login );
router.use('/signup', signup );

module.exports = router;