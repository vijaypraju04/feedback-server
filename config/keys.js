// keys.js - figure out what set of credentials to return
// are we in prod or dev environment?
if (process.env.NODE_ENV === 'production') {
  // heroku does this for us
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev');
}
