const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router
const fs = require('fs')
const publicCorpseDir = 'public/images'
const {imIdentify, imCrop} = require('../utility/utility')

router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Photo.findById(id)
    .then(photo => res.json(photo))
    .catch(next)
})

/**
 * cell, corpseId, userId, encodedPhoto
 */
router.post('/', (req, res, next) => {
  console.log(req.body)
  const {cell, corpseId, userId, encodedPhoto} = req.body
  const corpseDir = `${publicCorpseDir}/${corpseId}`
  if (!fs.existsSync(corpseDir)) {
    const err = Error(`Corpse directory does not exist - Corpse ${corpseId}`)
    err.status = 400
    throw err
  }
  const basePhotoName = `${corpseId}-${cell}`
  const basePhotoData = Buffer.alloc(encodedPhoto.length, encodedPhoto, 'base64')
  const filePathName = `${corpseDir}/${basePhotoName}.jpg`
  const edgeFilePathName = `${corpseDir}/${basePhotoName}-edge.jpg`
  fs.writeFileSync(filePathName, basePhotoData)

  imIdentify(`${corpseDir}/${basePhotoName}.jpg`)
    .then(data => {
      return imCrop({
        srcPath: filePathName,
        dstPath: edgeFilePathName,
        width: data.width,
        height: 20,
        quality: 1,
        gravity: 'South'
      })
    })
    .catch(next)

  Photo.create({
    imgUrl: `${corpseDir}/${basePhotoName}.jpg`,
    edgeUrl: `${corpseDir}/${basePhotoName}-edge.jpg`,
    cell,
    corpseId,
    userId
  })
    .then(photo => {
      res.status(201).json(photo)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  const {id} = req.params
  Photo.update(req.body, {where: {id}})
    .then(photo => res.json(photo))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let {id} = req.params
  Photo.findById(id)
    .then(photo => {
      if (fs.existsSync(photo.imgUrl)) {
        fs.unlink(photo.imgUrl)
      }
      if (fs.existsSync(photo.edgeUrl)) {
        fs.unlink(photo.edgeUrl)
      }
      return photo
    })
    .then(photo => {
      id = photo.id
      return Photo.destroy({where: {id}})
        .then(() => {
          res.status(204).end()
        })
    })
    .catch(next)
})
