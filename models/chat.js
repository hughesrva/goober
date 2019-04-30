var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  userOne: {
    type: String,
    required: true
  },
  userTwo: {
    type: String,
    required: true
  },
  messages: {
    message: {
      type: String
    },
    sender: {
      type: String
    }
  }
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
