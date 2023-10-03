// Import the 'express' module to create a router........................................
const express = require('express');
const router = express.Router();




// Import the 'userCtrl' module which contains controller functions for user routes ...................................
const userCtrl = require('../controllers/user');

// Route to handle user signup/login....................................................
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)




// Export the router to be used in other parts of the application..............................
module.exports = router;