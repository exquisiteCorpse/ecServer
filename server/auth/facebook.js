const passport = require('passport')
const app = require('express').Router()
const FacebookStrategy = require('passport-facebook')
const { facebook } = require('../../secrets')
const { User } = require('../db/models')
module.exports = app

const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url
})

// Register Facebook Passport strategy

const strategy = new FacebookStrategy(facebook, (accessToken, refreshToken, profile, done) => {
  const facebookId = profile.id
  const name = profile.displayName
  const email = profile.email

  User.find({where: {facebookId}})
    .then(user => user
      ? done(null, user)
      : User.create({name, email, facebookId})
        .then(user => done(null, user))
    )
    .catch(done)

  done(null, transformFacebookProfile(profile._json))
})

passport.use(strategy)

// Set up Facebook auth routes
app.get('/facebook', passport.authenticate('facebook'))

app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)))
