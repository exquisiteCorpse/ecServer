const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router
const fs = require('fs')
const publicCorpseDir = 'public/corpse'
const im = require('imagemagick')

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

  im.identify(`${corpseDir}/${basePhotoName}.jpg`, (err, data) => {
    if (err) throw console.error('Photos', err)
    const {width, height} = data
    im.crop({
      srcPath: filePathName,
      dstPath: edgeFilePathName,
      width: width,
      height: height * 0.025,
      quality: 1,
      gravity: 'South'
    })
  })

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
