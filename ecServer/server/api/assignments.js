'use strict'
/**
 * Assignments
 */
const router = require('express').Router()
const {Assignment} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Assignment.findAll()
    .then(assignments => res.json(assignments))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Assignment.findById(req.params.id)
    .then(assignments => res.json(assignments))
    .catch(next)
})

/**
 * requires: corpseId, assignorId, assigneeId, complete
 */
router.post('/', function (req, res, next) {
  Assignment.create(req.body)
    .then(assignments => res.json(assignments))
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  Assignment.update(req.body, {where: {id: req.params.id}})
    .then(assignments => res.json(assignments))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Assignment.destroy({where: {id: req.params.id}})
    .then(() => res.status(204).end())
    .catch(next)
})
