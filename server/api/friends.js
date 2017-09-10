const router = require('express').Router()
const { User } = require('../db/models')
const db = require('../db')
module.exports = router

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findOne({where: {id},
    include: [{ model: User, as: 'friend' }]
  })
    .then(user => res.json(user.friend))
    .catch(next)
})

router.post('/', (req, res, next) => {
  db.model('Friend').create(req.body)
    .then(friend => res.json(friend))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  db.model('Friend').destroy({where: req.body})
    .then(friend => res.json(friend))
    .catch(next)
})
