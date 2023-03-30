const Message = require("../../models/message");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

// --the function is not completed
const deleteAllMessages = async (req, res) => {
  try {
    const deleteRes = await Message.deleteMany({});

    if (deleteRes) {
      res.status(201).json({ message: "All messages are deleted." });
    } else {
      res.status(500).json({ message: "All messages are not deleted." });
    }
  } catch (err) {
    console.log("Delete Message Error:\n", err);
    res.status(400).json({ message: beautifySchemaErrorMsgs(err) });
  }
};

module.exports = deleteAllMessages;
