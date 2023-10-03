// Import the 'express' module to create a router........................................
const express = require('express');
const router = express.Router();




// Import the 'sauceCtrl' module which contains controller functions for user routes ...................................
const sauceCtrl = require('../controllers/sauce');

// Route to handle Sauce creation....................................................
router.post('/',sauceCtrl.createSauce);




// Export the router to be used in other parts of the application..............................
module.exports = router;