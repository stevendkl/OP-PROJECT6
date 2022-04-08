const Sauce = require('../models/sauce');
const fs = require('fs');

// setup sauce create function
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');  
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: url + '/images/' + req.file.filename,
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce saved successfully!'
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

// setup sauce get function
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// setup sauce update function
exports.modifySauce = (req, res, next) => {
  if (req.file) {
    console.log("update all");
    const url = req.protocol + '://' + req.get('host');
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: url + '/images/' + req.file.filename,
          };
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce updated successfully!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // No new file upload, only update text
    console.log("updata text");
    const sauceObject = { ...req.body };
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce updated successfully!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// setup sauce delete function
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Sauce deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

// setup function of get all sauce from database
exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// setup sauce like/dislike function
exports.likeSauce = (req, res, next) => {
  // get user's like/dislike data
  Sauce.findOne({
      _id: req.params.id
  }).then((sauce) => {
      // Add 1 like to sauce
      if (req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked.push(req.body.userId);
          sauce.likes += 1;
        }
      // Add 1 dislike to sauce
      if (req.body.like === -1 && !sauce.usersDisliked.includes(req.body.userId)) {
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes += 1;
        }
      // Remove like and dislike of this user for sauce  
      if (req.body.like === 0) {
          // Remove like of this user for sauce          
          if (sauce.usersLiked.includes(req.body.userId)) {
              sauce.usersLiked.remove(req.body.userId);
              sauce.likes += -1;}
          // Remove dislike of this user for sauce 
          if (sauce.usersDisliked.includes(req.body.userId)) {
              sauce.usersDisliked.remove(req.body.userId);
              sauce.dislikes += -1;}
            }
      // update database
      Sauce.updateOne({_id: req.params.id}, sauce)
          .then((sauce) => {
              res.status(200).json(sauce);
          })
          .catch((error) => {
              res.status(400).json({
                  error: error
              });
          });
  });
};


