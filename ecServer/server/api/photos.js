const router = require('express').Router()
const {photo} = require('../db/models')
module.exports = router


router.get('/:photoId', (req, res, next) => {
  const id = req.params.photoId
  Photo.findOne({ where: {id} })
    .then(photo => res.json(photo))
    .catch(next)
  })

  router.get('/:corpseId', (req, res, next) => {
    const corpseId = req.params.corpseId
    Photo.findAll({ where: {corpseId} })
      .then(photos => res.json(photos))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    Photo.create(req.body)
    .then(photo => res.status(201).json(photo))
    .catch(next)
  })

  //use tbd
  // router.put('/:corpseId', (req, res, next) => {
  //   const corpseId = req.params.corpseId
  //   Photo.update(req.body, { where: {corpseId} })
  //     .then(updatedPhoto => res.json(updatedProduct))
  //     .catch(next)
  // })

  // router.delete('/:photoId', (req, res, next) => {
  //   const id = req.params.photoId
  //   Photo.destroy({ where: id})
  //     .then(() => res.sendStatus(204))
  //     .catch(next)
  //   })




