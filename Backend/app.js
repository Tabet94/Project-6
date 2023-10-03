// Import necessary modules and packages...............................
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');



// Create an instance of the Express application .................................
const app = express();


// Middleware to parse JSON request bodies ..............................................
app.use(express.json())


// Connect to MongoDB using the provided connection string .................................................................
mongoose.connect('mongodb+srv://tabe:5EhHM7LmeYQvPmiU@cluster0.4cxkhlu.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
console.log("connected to mongdb")
})
.catch((error) => {
console.log('unable to connect to mongodb')
console.error(error)
});


app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes .................................................................
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);






module.exports = app;