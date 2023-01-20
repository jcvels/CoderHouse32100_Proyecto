const router = require('express').Router();
const authController = require('../../controllers/auth.controller');
const fileController = require('../../controllers/file.controller');

router.post('/login', authController.test );
router.post('/signup', fileController.upload, authController.create );
router.post('/recovery', authController.test );

module.exports = router;