const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router
const fs = require('fs')
const tmpDir = '/tmp'
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
  const basePhotoData = Buffer.from(encodedPhoto, 'base64')
  const photoFileName = `${corpseId}-${userId}-${cell}.jpeg`
  const edgeFileName = `${corpseId}-${userId}-${cell}-edge.jpeg`

  const data = {
    Key: photoFileName,
    Body: basePhotoData,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }
  sendToS3Bucket(data)
    .then(data => {
      return createTmpFile(data.Key, data.Body)
    })
    .then(res => imIdentify(res.filename))
    .then(res => imCrop(res))
    .then(res => getPhotoData(res.edgeFileName))
    .then(res => {
      console.log(res)
      const edgePhotoData = Buffer.from(res.data, 'base64')
      return {
        Key: edgeFileName,
        Body: edgePhotoData,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      }
    })
    .then(edgePhoto => sendToS3Bucket(edgePhoto))
    .then(data => deleteTmpFile(data.Key))
    .then(data => deleteTmpFile(data.replace(/-edge/, '')))
    .then(photoFileName => {
      return Photo.create({
        imgUrl: photoFileName,
        edgeUrl: photoFileName.replace(/.jpeg/, '-edge.jpeg'),
        cell,
        corpseId,
        userId
      })
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
