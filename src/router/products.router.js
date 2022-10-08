const router = require('express').Router();
const api = require('../api/products.api');

router.get('/', (req, res) => {
    api.list()
        .then( data => res.status(200).send(data) )
        .catch( err => res.status(500).send(err) )
})

router.get('/:id', (req, res) => {
    api.listOne(req.params.id)
        .then( data => {
            if( data === null ) res.status(204).send(data);
            else res.status(200).send(data);
        })
        .catch( err => res.status(500).send(err) )
})

router.post('/', (req, res) => {
    api.create(req.body)
        .then( data => res.status(201).send(data) )
        .catch( err => res.status(500).send(err) )
})

router.put('/:id', (req, res) => {
    api.update(req.params.id, req.body)
        .then( data => {
            if( data === null ) res.status(404).send(data);
            else res.status(200).send(data);
        })
        .catch( err => res.status(500).send(err) )
})

router.delete('/:id', (req, res) => {
    api.del(req.params.id)
        .then( data => {
            if(data === true) res.status(200).send()
            else res.status(404).send()
        })
        .catch( err => res.status(500).send(err) )
})

module.exports = router;