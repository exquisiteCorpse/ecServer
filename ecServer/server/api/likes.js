const router = require('express').Router()
const {Like} = require('../db/likes')
module.exports = router

router.get('/', (req, res, next) => {
  Like.findAll()
    .then(likes => res.json(likes))
    .catch(next)
})

router.get('/:corpseId', (req, res, next) => {
  Like.findAll({where:{
    corpsId: req.params.corpseId
  }})
    .then(likes => res.json(likes))
    .catch(next)
})

 router.delete('/:id',function(req, res, next) {
   Like.destroy({where: {
     id: req.params.id
   }}).then(likes => res.json(likes))
   .catch(next)
 })

 router.post('/', function(req, res, next) {
   Like.create(req.body)
   .then(likes => res.json(likes))
   .catch(next)
 })
