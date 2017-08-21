const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const attributesToReturn = { attributes: ['id', 'username', 'email'] }

router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        const err = Error('User not found')
        err.status = 400
        throw err
      }
      req.user = user
      next()
      return null
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll(attributesToReturn)
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  req.user.reload(User.scope('populated'))
    .then(popUser => res.json(popUser))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
    .then(user => res.status(200).json(user))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.post('/fbUser', (req, res, next) => {
  User.findOrCreate({where: {
    username: req.body.name,
    facebookId: req.body.id,
    email: req.body.email
  }})
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
