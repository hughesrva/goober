const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");
const Dog = require("../../models/dog");

// AUTHENTICATION
//
// register new user
router.post("/api/register", (req, res) => {
  // // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // // Check validation
  if (!isValid) {
    console.log("didn't validate");
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log("error when searching");
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        location: req.body.location
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// login
router.post("/api/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                userID: user.id
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  }
});

// logout
router.get("/api/logout", function(req, res) {
  req.logout();
});

//
// END AUTHENTICATION

// USER INFORMATION
//
// pull user information
router.get("/api/user/:id", function(req, res) {
  User.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err));
});

// edit user information
router.post("/api/user/update/:userid", function(req, res) {
  User.update(
    { _id: req.params.userid },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      location: req.body.location
    }
  );
});

//
// END USER INFORMATION

// DOG INFORMATION
//

// add new dog
router.post("/api/dog", function(req, res) {
  const newDog = new Dog({
    name: req.body.name,
    gender: req.body.gender,
    weight: req.body.weight,
    energy: req.body.energy,
    patience: req.body.patience,
    dominance: req.body.dominance,
    playfulness: req.body.playfulness,
    ownerID: req.body.ownerID
  });

  addDogToOwner = (owner, dog) => {
    User.updateOne({ _id: owner }, { $push: { dogs: dog } })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  };
  newDog
    .save()
    .then(res => addDogToOwner(req.body.ownerID, res._id))
    .catch(err => console.log(err));
});

// find owner's dogs
router.get("/api/dog/:ownerid", function(req, res) {
  Dog.find({ ownerID: req.params.ownerid })
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err));
});

// delete a dog
router.delete("/api/dog/:dogid", function(req, res) {
  Dog.remove({ _id: req.params.dogid }).then(response =>
    res.json(response).catch(err => res.status(422).json(err))
  );
});

//
// END DOG INFORMATION

module.exports = router;