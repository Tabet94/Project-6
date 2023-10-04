// Import the 'express' module to create a router........................................
const express = require('express');
const router = express.Router();




// Import the 'sauceCtrl' module which contains controller functions for user routes ...................................
const sauceCtrl = require('../controllers/sauce');
const auth = require('../Middleware/auth');
const multer = require('../Middleware/multer-config');

// Route to handle Sauce creation....................................................
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);





// Export the router to be used in other parts of the application..............................
module.exports = router;