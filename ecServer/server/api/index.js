const router = require('express').Router()
module.exports = router

// router.use('/assignments', require('./assignments'))
router.use('/likes', require('./likes'))
router.use('/photos', require('./photos'))
router.use('/corpses', require('./corpses'))
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
