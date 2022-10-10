const securedPaths = [
    { path:'/api/products', method:'POST' },
    { path:'/api/products', method:'PUT' },
    { path:'/api/products', method:'DELETE' },
]

const isPathOpen = (req) => {
    let isSecured = securedPaths.some( item => item.method === req.method && req.url.includes(item.path) );
    console.log('isSecured =', isSecured);
    return !isSecured
}

const securer = (req, res, next) => {
    if( req.headers.admin === 'true' || isPathOpen(req) ) next()
    else res.status(401).send()
}

module.exports = securer;