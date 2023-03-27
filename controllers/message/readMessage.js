const Message = require("../../models/message");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

// --the function is not completed
const readMessage = async (req, res) => {
  try {
    const { userId } = req.body;
    const messages = await Message.find({ userId }); // sort and limit max number is remaining

    if (messages) {
      res.status(201).json({ message: "Message saved.", messages });
    } else {
      res.status(500).json({ message: "Message not saved." });
    }
  } catch (err) {
    console.log("Save Message Error:\n", err);
    res.status(400).json({ message: beautifySchemaErrorMsgs(err) });
  }
};

module.exports = readMessage;
