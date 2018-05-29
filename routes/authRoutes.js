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

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
      // res has a function attached to it called redirect
    }
  );
  // passport.authenticate('google') is a middleware it's a function that
  // takes the incoming request then further authenticates the user
  // it authenticates by taking the code out of the URL and then fetches user profile
  // then it calls the callback in our googlestrategy
  // it then passes our request on to the next middleware

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    // res.send(req.user)
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    // res.send(req.session);
    // req.session contains exact info stored inside cookie
  });
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
