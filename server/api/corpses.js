'use strict'
/**
 * Corpse API
 * Corpse Model: title, totalCells, complete
 */
const router = require('express').Router()
const {Corpse, Photo, User, Assignment, Like} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router
const fs = require('fs')
const publicCorpseDir = 'public/images'
const {mergePhotos, createTmpFile, deleteTmpFile, getFromS3Bucket, sendToS3Bucket} = require('../utility/utility')

/**
 * Default columns
 */
const attributesToReturn = {order: [['id', 'DESC']], attributes: ['id', 'title', 'totalCells', 'complete']}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    const error = new Error('Not allowed!!')
    error.status = 401
    next(error)
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    const error = new Error('Must have admin privileges')
    error.status = 401
    next(error)
  }
}

/**
 * CorpseID Param
 * returns
 */
router.param('corpseId', (req, res, next, id) => {
  Corpse.findById(id,
    {
      order: [[Photo, 'id', 'ASC']],
      include: [
        {model: Photo, include: [{model: User, attributes: ['username']}]},
        {model: Assignment},
        {model: User, attributes: ['id', 'username', 'email']},
        {model: Like, attributes: ['id', 'userId']}
      ]
    })
    .then(corpse => {
      if (!corpse) {
        const err = Error('Corpse not found')
        err.status = 400
        throw err
      }
      req.corpse = corpse
      next()
      return null
    })
    .catch(next)
})

/**
 * route /api/corpse
 * GET
 * returns all corpse
 */
router.get('/', (req, res, next) => {
  Corpse.findAll(attributesToReturn)
    .then(corpse => res.json(corpse))
    .catch(next)
})

router.get('/display', (req, res, next) => {
  Corpse.findAll(
    {
      include: [
        {
          model: Photo,
          include: [{model: User, attributes: ['username']}]
        }
      ]
    }
  )
    .then(corpse => res.json(corpse))
    .catch(next)
})

/**
 * route /api/corpse/corpseId i.e. /api/corpse/1
 * GET
 * returns a specific corpse by corpseId
 */
router.get('/:corpseId', (req, res, next) => {
  res.json(req.corpse)
})

/**
 * route /api/corpse
 * POST
 * creates and returns new Corpse
 */
router.post('/', (req, res, next) => {
  Corpse.create(req.body)
    .then(corpse => res.status(201).json(corpse))
    .catch(next)
})

/**
 * route /api/corpse/corpseId
 * PUT
 * updates and existing corpse by its corpseId
 */
router.put('/:corpseId', (req, res, next) => {
  req.corpse.update(req.body)
    .then(corpse => {
      if (corpse.complete) {
        const data = {
          id: req.corpse.id,
          top: req.corpse.photos[0].imgUrl,
          middle: req.corpse.photos[1].imgUrl,
          bottom: req.corpse.photos[2].imgUrl,
          topData: '',
          middleData: '',
          bottomData: '',
          corpseFile: `corpse-${req.corpse.id}.jpeg`
        }
        Promise.all([
          getFromS3Bucket(data.top),
          getFromS3Bucket(data.middle),
          getFromS3Bucket(data.bottom)])
          .then(res => {
            data.topData = res[0].Body
            data.middleData = res[1].Body
            data.bottomData = res[2].Body
            return Promise.all([
              createTmpFile(data.top, data.topData),
              createTmpFile(data.middle, data.middleData),
              createTmpFile(data.bottom, data.bottomData)
            ])
          })
          .then(files => mergePhotos(files))
          .then(data => sendToS3Bucket(data))
          .then(() => {
            return Promise.all([
              deleteTmpFile(data.top),
              deleteTmpFile(data.middle),
              deleteTmpFile(data.bottom),
              deleteTmpFile(data.corpseFile)
            ])
          })
      }
    })
    .then(corpse => res.status(201).json(corpse))
    .catch(next)
})

/**
 * route /api/corpse/corpseId
 * DEL
 * deletes an existing corpse by its corpseId
 */
router.delete('/:corpseId', (req, res, next) => {
  const dirPath = `${publicCorpseDir}/${req.corpse.id}`
  if (fs.existsSync(dirPath)) {
    fs.rmdirSync(dirPath)
  }
  req.corpse.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
