const { verify } = require('jsonwebtoken');
const { errorMiddleware } = require('./error.middleware');

const openPaths = [
	{ path:'/app/signup', method:'GET' },
	{ path:'/app/login', method:'GET' },
	{ path:'/app', method:'GET' },
	{ path:'/js/front-login-controller.js', method:'GET' },
	{ path:'/js/front-signup-controller.js', method:'GET' },
	{ path:'/api/auth/signup', method:'POST' },
	{ path:'/api/auth/login', method:'POST' },
]

const isPathOpen = (req) => {
	return openPaths.some( item => item.method === req.method && req.url.includes(item.path) );
}

const setFail = (res, err=null) => {
	const error = new Error(`401: Failed credential validation: ${err}`)
	errorMiddleware(error, null, res);
}

const securer = (req, res, next) => {
	if (isPathOpen(req)) next()
	else if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const secret = process.env.SECRET
			verify(token, secret, (err, decode) => {
				if(err) setFail(res, err)
				else next()
			});
		}
		else setFail(res)
}

module.exports = {
	securer
}