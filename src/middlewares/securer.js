const openPaths = [
    { path:'/api/products', method: 'GET' }
]

const isPathOpen = (req) => {
    return openPaths.some( item => item.method === req.method && req.url.includes(item.path) )
}

const securer = (req, res, next) => {
    if( req.headers.admin === 'true' || isPathOpen(req) ) next()
    else res.status(401).send()
}

module.exports = securer;