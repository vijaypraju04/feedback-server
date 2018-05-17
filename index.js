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
}, (accessToken) => {
      console.log(accessToken)
    }
  )
)
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
