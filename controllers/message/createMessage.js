const Message = require("../../models/message");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

const createMessage = async (req, res) => {
  try {
    const { sentByUser, userId, body } = req.body;
    const messageDetails = new Message({ sentByUser, userId, body });
    const messageRes = await messageDetails.save();

    if (messageRes) {
      res.status(201).json({ message: "Message saved." });
    } else {
      res.status(500).json({ message: "Message not saved." });
    }
  } catch (err) {
    console.log("Save Message Error:\n", err);
    res.status(400).json({ message: beautifySchemaErrorMsgs(err) });
  }
};

module.exports = createMessage;
