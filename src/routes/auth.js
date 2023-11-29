const express = require('express');
const router = express.Router();
const passport = require('../controllers/authController');
const jwt = require('jsonwebtoken');

router.post('/authenticate', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // If authentication is successful, generate a JWT token with an expiration time
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration time to 1 hour

    // Return the token to the client
    return res.json({ token });
  })(req, res, next);
});

module.exports = router;
