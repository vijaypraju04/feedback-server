//CLIENT ID
//CLIENT SECRET
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// we need to make sure our User model is defined before using passport ^^

mongoose.connect(keys.mongoURI);
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    // maxAge is how long this cookie can exist in browser before it expires
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

// authRoutes(app);
// require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
// runs locally if no environment variable defined
// meaning heroku is not running it defaults to
// a server on our machines
app.listen(PORT);
