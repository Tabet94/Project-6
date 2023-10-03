const Sauce = require('../models/sauce')


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

