const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
  // stuffing user.id into cookie here
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    // this user instance is what we fetched from database
    done(null, user);
  });
  // deserialize to GET whatever in the cookie turn into a User again
  // user model instance added to the req object as req.user
});

// encodes the user_id inside of the cookie

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            // this is creating a mongoose instance (single record in our collection)
            .save()
            .then(user => done(null, user));
          // async javascript when saving to database
          // user instance is different than new User before saving to DB
        }
      });
    }
  )
);
