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
const Chat = require("../../models/chat");

// AUTHENTICATION
//

// register new user
router.post("/api/register", (req, res) => {
  // // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // // Check validation
  if (!isValid) {
    console.log(errors);
    return res.send(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log("error when searching");
      return res.send({
        success: false,
        message: "Email address already in use."
      });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        location: req.body.location,
        friend_requests: [],
        image: req.body.image
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
    return res.send({ success: false, message: "Invalid email format." });
  } else {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.send({
          success: false,
          message: "Email address not found."
        });
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
          return res.send({ success: false, message: "Incorrect password." });
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
router.put("/api/user/update/:userid", function(req, res) {
  User.updateOne(
    { _id: req.params.userid },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        location: req.body.location
      }
    }
  )
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

// add friend request to user
router.put("/api/user/request/:userid", function(req, res) {
  var user = req.params.userid;
  var request = { id: req.body.id, message: req.body.message };
  console.log("Recipient: " + user + " Request: " + request);
  User.updateOne({ _id: user }, { $push: { friend_requests: request } })
    .then(response => res.json(response))
    .catch(err => console.log(err));
});

// reject friend request (remove request from user)
router.put("/api/user/reject", function(req, res) {
  User.updateOne(
    { _id: req.body.userID },
    {
      $pull: { friend_requests: { id: req.body.requestID } }
    }
  )
    .then(response => res.json(response))
    .catch(err => console.log(err));
});

// accept friend request (remove request from user and add users to friends lists)
router.put("/api/user/accept", function(req, res) {
  User.findOneAndUpdate(
    { _id: req.body.userID },
    {
      $pull: { friend_requests: { id: req.body.friendID } },
      $push: { friends: { id: req.body.friendID } }
    }
  )
    .then(response => res.json(response))
    .catch(err => console.log(err));

  User.update(
    { _id: req.body.friendID },
    { $push: { friends: { id: req.body.userID } } }
  )
    .then(response => res.json(response))
    .catch(err => console.log(err));
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

// find matching dogs
router.get("/api/search", function(req, res) {
  Dog.find({
    energy: { [req.query.energyOperator]: req.query.energyValue },
    $and: [
      { weight: { $gte: req.query.minWeight } },
      { weight: { $lte: req.query.maxWeight } }
    ],
    patience: { [req.query.patienceOperator]: req.query.patienceValue },
    dominance: { [req.query.dominanceOperator]: req.query.dominanceValue },
    playfulness: {
      [req.query.playfulnessOperator]: req.query.playfulnessValue
    }
  })
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

// CHAT INFORMATION
//

// start a new chat
router.post("/api/chat/new", function(req, res) {
  
  Chat.findOne(
    {
      $and: [
        {
          $or: [{ userOne: req.body.userOne }, { userOne: req.body.userTwo }]
        },
        {
          $or: [{ userTwo: req.body.userOne }, { userTwo: req.body.userTwo }]
        }
      ]
    },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      if (!result) {
        const newChat = new Chat({
          userOne: req.body.userOne,
          userTwo: req.body.userTwo,
          messages: {
            message: "Start the conversation!",
            sender: "sys"
          }
        });
        newChat.save();
      }
    }
  )
    .then(results => res.json(results))
    .catch(err => console.log(err));
});

// send new chat message
router.post("/api/chat/send", function(req, res) {
  Chat.findOneAndUpdate(
    {
      $and: [
        {
          $or: [{ userOne: req.body.userOne }, { userOne: req.body.userTwo }]
        },
        {
          $or: [{ userTwo: req.body.userOne }, { userTwo: req.body.userTwo }]
        }
      ]
    },
    {
      $push: {
        messages: {
          message: req.body.message,
          sender: req.body.userName,
          timestamp: Date.now()
        }
      }
    }
  )
    .then(results => res.json(results))
    .catch(err => console.log(err));
});

//
// END OF CHAT INFORMATION

module.exports = router;
