//CLIENT ID
//CLIENT SECRET
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/User');

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
