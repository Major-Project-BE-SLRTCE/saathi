const Message = require("../../models/message");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

// --the function is not completed
const readMessage = async (req, res) => {
  try {
    const { userId, skipCount } = req.body;

    // retrieving recent 50 messages of a specific user
    const messages = await Message.find({ userId })
      .sort({ timestamp: -1 })
      .limit(50)
      .skip(skipCount);

    if (messages) {
      res
        .status(201)
        .json({
          message: "Messages fetched.",
          count: messages.length,
          messages
        });
    } else {
      res.status(500).json({ message: "Messages not fetched." });
    }
  } catch (err) {
    console.log("Read Message Error:\n", err);
    res.status(400).json({ message: beautifySchemaErrorMsgs(err) });
  }
};

module.exports = readMessage;
