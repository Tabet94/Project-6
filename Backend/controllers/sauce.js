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
  // Create a new sauce object with the given ID
  let sauce = new Sauce({ _id: req.params._id });

  // Check if a file is uploaded (for image)
  if (req.file) {
    // Construct the image URL using the request's protocol and host
    const url = req.protocol + '://' + req.get('host');
    // Parse the sauce data from the request body
    req.body.sauce = JSON.parse(req.body.sauce);
    // Update the sauce object with the new values from the request
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
      imageUrl: url + '/images/' + req.file.filename, // Update the image URL
    };
  } else {
    // Update the sauce object with the new values from the request
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

  // Update the sauce in the database with the new values
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      // Send a success response
      res.status(201).json({
        message: 'Sauce updated',
      });
    })
    .catch((error) => {
      // Send an error response if the update fails
      res.status(400).json({
        error: error,
      });
    });
};


// Function to "DELETE SAUCE" .....................................................................
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




// Function to "LIKE SAUCE" ..........................................................................
exports.likeSauce = (req, res, next) => {
  // Find the sauce by its ID
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Check if the user wants to like the sauce
      if (req.body.like === 1) {
        // Check if the user hasn't already liked the sauce
        if (!sauce.usersLiked.includes(req.body.userId)) {
          // Add the user to the 'usersLiked' array and increment the 'likes' count
          sauce.usersLiked.push(req.body.userId);
          sauce.likes++;
        }
      }
      // Check if the user wants to dislike the sauce
      else if (req.body.like === -1) {
        // Check if the user hasn't already disliked the sauce
        if (!sauce.usersDisliked.includes(req.body.userId)) {
          // Add the user to the 'usersDisliked' array and increment the 'dislikes' count
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes++;
        }
      }
      // Check if the user wants to remove their like/dislike
      else if (req.body.like === 0) {
        // Check if the user has previously liked the sauce
        if (sauce.usersLiked.includes(req.body.userId)) {
          // Remove the user from the 'usersLiked' array and decrement the 'likes' count
          sauce.usersLiked.pull(req.body.userId);
          sauce.likes--;
        }
        // Check if the user has previously disliked the sauce
        else if (sauce.usersDisliked.includes(req.body.userId)) {
          // Remove the user from the 'usersDisliked' array and decrement the 'dislikes' count
          sauce.usersDisliked.pull(req.body.userId);
          sauce.dislikes--;
        }
      }

      // Update the sauce in the database with the new values
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          // Send a success response
          res.status(200).json({ message: 'Sauce liked/disliked successfully' });
        })
        .catch((error) => {
          // Send an error response if the update fails
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      // Send an error response if the sauce is not found
      res.status(404).json({ error });
    });
};

// Function to "DELETE LIKE/DISLIKE" ..................................................................
exports.deleteLikeDislike = (req, res, next) => {
  // Find the sauce by its ID
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Check if the user has previously liked the sauce
      if (sauce.usersLiked.includes(req.body.userId)) {
        // Remove the user from the 'usersLiked' array and decrement the 'likes' count
        sauce.usersLiked.pull(req.body.userId);
        sauce.likes--;
      }
      // Check if the user has previously disliked the sauce
      else if (sauce.usersDisliked.includes(req.body.userId)) {
        // Remove the user from the 'usersDisliked' array and decrement the 'dislikes' count
        sauce.usersDisliked.pull(req.body.userId);
        sauce.dislikes--;
      }

      // Update the sauce in the database with the new values
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          // Send a success response
          res.status(200).json({ message: 'Like/Dislike removed successfully' });
        })
        .catch((error) => {
          // Send an error response if the update fails
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      // Send an error response if the sauce is not found
      res.status(404).json({ error });
    });
};
