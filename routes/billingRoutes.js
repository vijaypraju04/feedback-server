const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    // this is set up by passport allowing us to access
    // current user

    // user is making reference to the copy of the user we
    // got back from the database
    // req.user might be old/outdated

    res.send(user);
    // sending back our user to the front-end
  });
};
