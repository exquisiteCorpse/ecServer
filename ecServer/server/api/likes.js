const router = require('express').Router()
const {Like} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Like.findAll()
    .then(likes => res.json(likes))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Like.findById(id)
    .then(likes => res.json(likes))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Like.destroy({where: {id: req.params.id}})
    .then(likes => res.json(likes))
    .catch(next)
})

router.post('/', function (req, res, next) {
  const {corpseId, userId} = req.body
  Like.findOrCreate({where: {corpseId, userId}})
    .spread(() => res.status(204).end())
    .catch(next)
})
