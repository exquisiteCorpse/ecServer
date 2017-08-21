const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook')
const { User } = require('../db/models')
module.exports = router

const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url
})

const facebook = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: process.env.FACEBOOK_PROFILE_FIELDS
}

// Register Facebook Passport strategy

const strategy = new FacebookStrategy(facebook,
  // async
  (accessToken, refreshToken, profile, done) => {
    const facebookId = profile.id
    const username = profile.displayName
    const email = profile.emails[0].value

    User.find({where: {facebookId}})
      .then(user => user
        ? done(null, user)
        : User.create({username, email, facebookId})
          .then(user => done(null, user))
      )
      .catch(done)

    done(null, transformFacebookProfile(profile._json))
  })

passport.use(strategy)

// Set up Facebook auth routes

router.get('/mobile', passport.authenticate('facebook'))

router.get('/mobile/callback',
  passport.authenticate('facebook', { failureRedirect: '/mobile' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('ecMobileApp://login?user=' + JSON.stringify(req.user)))
