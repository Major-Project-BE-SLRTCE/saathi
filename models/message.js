const { Schema, model } = require("mongoose");

const messageSchema = Schema({
  // if "sentByUser" is true -> message is sent by the user (chatter)
  // if "sentByUser" is false -> message is sent by bot
  sentByUser: {
    type: Boolean,
    required: true
  },
  // here "userId" is same for messages sent by both user and chatbot
  // i.e. here, "userId" shows that the specific message is related to a specific user
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required."]
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  messageBody: {
    type: String,
    required: [true, "Message body is required."],
    minlength: [1, "Message body must contain at least 1 character."],
    maxlength: [1000, "Message body must contain at most 1000 characters."]
  }
});

// to update the timestamp before saving the message
messageSchema.pre("save", function (next) {
  this.timestamp = new Date();
  next();
});

const Message = model("messages", messageSchema);
module.exports = Message;
