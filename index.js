//CLIENT ID
//CLIENT SECRET
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// we need to make sure our User model is defined before using passport ^^
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// can paste above into node terminal to play around with mongoose queries

const app = express();

// app.use accessing middlewares

app.use(bodyParser.json());
// parses body and makes sure it's added to the incoming req.body object

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    // maxAge is how long this cookie can exist in browser before it expires
  })
);

app.use(passport.initialize());
app.use(passport.session());

// three middlewars intercepting requests

// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// authRoutes(app);
// require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('feedback-client/build'));
  // check inside our client/build directory
  // and see if file matches up with what we
  // are looking for

  // Express will serve up the index.html file
  // if it does not recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'feedback-client', 'build', 'index.html')
    );
  });
}
// IF WE ARE ON HEROKU ^^^

const PORT = process.env.PORT || 5000;
// runs locally if no environment variable defined
// meaning heroku is not running it defaults to
// a server on our machines
app.listen(PORT);
