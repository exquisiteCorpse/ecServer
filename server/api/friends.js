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
  ///do I do an include here?
  db.model('Friend').create(req.body)
    .then((friend) => {
      db.model('Friend').create({where: {
        userId: friend.friendId,
        friendId: friend.userId
      }})
        .then(() => {

        })
      return res.json(friend)
    })
    .catch(next)
})

router.delete('/:userId/:friendId', (req, res, next) => {
  db.model('Friend').destroy({where: {
    userId: req.params.userId,
    friendId: req.params.friendId
  }})
    .then((friend) => {
      db.model('Friend').destroy({where: {
        userId: req.params.friendId,
        friendId: req.params.userId
      }})
      return friend
    })
    .then(friend => res.json(friend))
    .catch(next)
})
