const Sauce = require('../models/sauce')
const fs = require('fs');


// Function to "CREATE SAUCE".....................................................................
exports.createSauce = (req, res, next) => {
  // Parse the sauce data from the request body
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      mainPepper: req.body.sauce.mainPepper,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.sauce.price,
      userId: req.body.sauce.userId,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes, 
    });
    
    // Save the new created sauce to the database 
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

// Function to "GET ALL SAUCES" .......................................................................
exports.getAllSauces =  (req, res, next) => {
  
  // Retrieve all sauces from the database
  Sauce.find()
  .then( sauces => res.status(200).json(sauces))
  .catch( error => res.status(400).json({ error }))
};


// Function to "GET ONE SAUCE" ..........................................................................
exports.getOneSauce = (req, res, next) => {

  // Retrieve a single sauce by its ID from the database
  Sauce.findOne({_id : req.params.id})
  .then( sauce => res.status(200).json(sauce))
  .catch( error => res.status(404).json({ error }))
};

// Function to "UPDATE SAUCE" .....................................................................
exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
    _id: req.params.id,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    mainPepper: req.body.sauce.mainPepper,
    description: req.body.sauce.description,
    price: req.body.sauce.price,
    userId: req.body.userId,
    heat: req.body.sauce.heat,
    likes: req.body.sauce.likes,
    dislikes: req.body.sauce.dislikes,
    };
  } else {
    sauce = {
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    mainPepper: req.body.mainPepper,
    description: req.body.description,
    price: req.body.price,
    userId: req.body.userId,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    };
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated '
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Function to "UPDATE SAUCE" .....................................................................
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})  
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; 
      fs.unlink(`images/${filename}`, () => { 
        Sauce.deleteOne({_id: req.params.id}) 
        .then(()=> res.status(200).json({ message: 'Sauce deleted'}))
        .catch(error => res.status(400).json({ error}))
    });
  })
};







