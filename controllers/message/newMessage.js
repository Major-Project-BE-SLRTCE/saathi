const Message = require("../../models/message");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

const newMessage = async (data) => {
  try {
    const { sentByUser, userId, messageBody } = data;
    const messageDetails = new Message({ sentByUser, userId, messageBody });
    const messageRes = await messageDetails.save();

    if (messageRes) {
      return "New message saved.";
    } else {
      throw new Error("Message not saved.");
    }
  } catch (err) {
    console.log("Save Message Error:\n", err);
    throw err;
  }
};

module.exports = newMessage;
