var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true
  },
  patience: {
    type: Number,
    required: true
  },
  dominance: {
    type: Number,
    required: true
  },
  playfulness: {
    type: Number,
    required: true
  },
  ownerID: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "http://www.stickpng.com/assets/images/5845e608fb0b0755fa99d7e7.png"
  }
});

const Dog = mongoose.model("dog", dogSchema);

module.exports = Dog;
