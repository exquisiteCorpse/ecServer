const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook')
const { User } = require('../db/models')
module.exports = router

// const transformFacebookProfile = (profile) => ({
//   name: profile.name,
//   avatar: profile.picture.data.url
// })

const facebookConfig = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['id', 'name', 'displayName', 'picture', 'email']
}

// Register Facebook Passport strategy

passport.use(
  new FacebookStrategy(
    facebookConfig,
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({
        where: { // change these fields depending on what you're actually storing!
          username: profile.displayName,
          facebookId: profile.id,
          email: profile.emails[0].value
        }
      })
        .spread((user) => done(null, user))
        .catch(done)
    }
  )
)

// Set up Facebook auth routes

router.get('/', passport.authenticate('facebook', {scope: ['email']}))

router.get('/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))
