const router = require('express').Router();
const { signIn, signUp } = require('../../controllers/auth.controller');
const fileController = require('../../controllers/file.controller');

router.post('/login', signIn );
router.post('/signup', fileController.upload, signUp ); //TODO: Cambiar para que la subida del AVATAR sea desde el perfil de usuario.

module.exports = router;