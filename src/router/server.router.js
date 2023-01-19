const router = require('express').Router();
const api_router = require('./api/api.router');
const app_router = require('./app/app.router');

router.use('/api', api_router);
router.use('/app', app_router);

router.use('*', (req, res) => {
    const error_response = { error : -2, descripction: `La ruta '${req.baseUrl}' método ${req.method} no se encuentra implementada.` };
    res.status(404).send( error_response );
})

module.exports = router;