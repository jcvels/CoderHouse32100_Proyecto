const router = require('express').Router();
const { create, validate } = require('../../controllers/auth.controller');
const fileController = require('../../controllers/file.controller');

router.post('/login', validate );
router.post('/signup', fileController.upload, create ); //TODO: Cambiar para que la subida del AVATAR sea desde el perfil de usuario.

module.exports = router;