const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findOne({where: {id},
    include: [{ model: User, as: 'friend' }]
  })
    .then(user => res.json(user.friend))
    .catch(next)
})
