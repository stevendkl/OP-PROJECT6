// Import express
const express = require('express');
const router = express.Router();

// Import middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Import sauce controller
const sauceCtrl = require('../controllers/sauce');

// Set sauce routes
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;