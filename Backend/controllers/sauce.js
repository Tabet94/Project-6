const Sauce = require('../models/sauce')


// Function to "CREATE SAUCE".....................................................................
exports.createSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
      name: req.body.sauce.name,
      manufacturer: req.body.sauce. manufacturer,
      mainPepper: req.body.sauce. mainPepper,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.sauce.price,
      userId: req.body.sauce.userId,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      
    });
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
  Sauce.find()
  .then( sauces => res.status(200).json(sauces))
  .catch( error => res.status(400).json({ error }))
};
