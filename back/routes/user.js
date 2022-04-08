// Import express
const express = require('express');
const router = express.Router();

// Import user controller
const userCtrl = require('../controllers/user');

// Set user routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;