const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 

// Function to handle user signup
exports.signup = (req, res, next) => {
    // Hash the user's password
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            // Create a new user with the email and hashed password
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Save the user to the database
            user.save()
            .then(() => {
                res.status(201).json({
                    message: 'User signed up successfully!'
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
        }
    );
};

// Function to handle user login
exports.login = (req, res, next) => {
    // Find a user by their email in the database
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        // Compare the provided password with the hashed password in the database
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            // If the password is correct, generate a JWT token
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET', // Replace with a real secret key
              { expiresIn: '24h' }); // Token expires in 24 hours
            // Respond with the user ID and token
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
};
