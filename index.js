//CLIENT ID
//CLIENT SECRET
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// we need to make sure our User model is defined before using passport ^^

mongoose.connect(keys.mongoURI);
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);
// require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
// runs locally if no environment variable defined
// meaning heroku is not running it defaults to
// a server on our machines
app.listen(PORT);
