var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var relationshipSchema = new Schema({
  user_one: {
    type: String,
    required: true
  },
  user_two: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Relationship = mongoose.model("Relationship", relationshipSchema);

module.exports = Relationship;
