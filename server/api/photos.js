const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router
const fs = require('fs')
const {imIdentify, imCrop, sendToS3Bucket, createTmpFile, deleteTmpFile, getPhotoData} = require('../utility/utility')

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
  const photoFileName = `${corpseId}-${userId}-${cell}.jpeg`
  const ContentEncoding = 'base64'
  const ContentType = 'image/jpeg'

  createTmpFile(photoFileName, Buffer.from(encodedPhoto, 'base64'))
    .then(data => imIdentify(data.filename, false))
    .then(data => imCrop(data, false))
    .then(data => getPhotoData(data.filename))
    .then(data => sendToS3Bucket({Key: data.filename, Body: data.data, ContentEncoding, ContentType}))
    .then(data => imIdentify(data.filename, true))
    .then(data => imCrop(data, true))
    .then(data => getPhotoData(data.filename))
    .then(data => sendToS3Bucket({Key: data.filename, Body: data.data, ContentEncoding, ContentType}))
    .then(data => {
      const imgUrl = data.filename.replace(/-edge/, '')
      const edgeUrl = data.filename
      console.log(`-- PhotoDB\timgUrl: ${imgUrl}\tedgeUrl: ${edgeUrl}`)
      return Photo.create({imgUrl, edgeUrl, cell, corpseId, userId})
    })
    .then(photo => res.status(201).json(photo))
    .then(() => deleteTmpFile(`ORIGINAL-${photoFileName}`))
    .then(data => deleteTmpFile(data.filename.replace(/^ORIGINAL-/, '')))
    .then(data => deleteTmpFile(data.filename.replace(/.jpeg/, '-edge.jpeg')))
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
  // if time permits, delete photos on S3 Bucket
  Photo.findById(id)
    .then(photo => {
      deleteTmpFile(photo.imgUrl)
        .then(() => deleteTmpFile(photo.edgeUrl))
        .catch(next)
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
