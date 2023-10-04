// Import necessary modules and packages
const express = require('express'); 
const mongoose = require('mongoose'); 
const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauce'); 
const bodyParser = require('body-parser'); 
const path = require('path'); 

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB using the provided connection string
mongoose.connect('mongodb+srv://tabe:5EhHM7LmeYQvPmiU@cluster0.4cxkhlu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB');
        console.error(error);
    });

// Middleware to handle CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Serve static files (images) from a specific directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Define routes for user and sauce functionality
app.use('/api/auth', userRoutes); // User-related routes
app.use('/api/sauces', sauceRoutes); // Sauce-related routes

// Export the Express application 
module.exports = app;
