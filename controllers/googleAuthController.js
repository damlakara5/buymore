const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start authentication with Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
