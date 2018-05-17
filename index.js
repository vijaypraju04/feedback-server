//CLIENT ID
//CLIENT SECRET

const express = require('express');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys')
 // we only want the strategy part
const app = express();

passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken)
      console.log('refresh token', refreshToken)
      console.log('profile:', profile)
    }
  )
);
// this instance has code internally that refers it
// to as a string of 'google'

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'))
// this contains the code that they are going to use
// google strategy is going to see that they have the code
// and attempt to do this

// we are asking google to give access to the user's profile
// and their email

// creates a new instance of GoogleStrategy passport
// tells application we want to authenticate users with google

// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy' });
// });

const PORT = process.env.PORT || 5000
// runs locally if no environment variable defined
// meaning heroku is not running it defaults to
// a server on our machines
app.listen(PORT);
