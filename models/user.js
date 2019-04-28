var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dogs: [
    {
      type: String
    }
  ],
  friend_requests: [],
  join_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
