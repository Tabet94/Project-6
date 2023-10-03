// Import necessary modules
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

// Define the user schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // User's email, required and must be unique
    password : { type: String, required: true } // User's password, required
});

// Apply the uniqueValidator plugin to the user schema
userSchema.plugin(uniqueValidator);

// Export the user schema as a Mongoose model named 'User'
module.exports = mongoose.model('User', userSchema);
