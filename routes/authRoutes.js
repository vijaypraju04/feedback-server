const passport = require('passport');
// nothing to do with the passport file we are requiring the original passport
// npm module we installed

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};

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