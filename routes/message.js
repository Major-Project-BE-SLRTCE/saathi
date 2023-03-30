const router = require("express").Router();

const newMessage = require("../controllers/message/newMessage");
const readMessage = require("../controllers/message/readMessage");
const deleteAllMessages = require("../controllers/message/deleteAllMessages");

// socket.io is doing the job of creating new messages
// router.post("/create", async (req, res) => {
//   await newMessage(req, res);
// });

router.get("/read", async (req, res) => {
  await readMessage(req, res);
});

// CAUTION: This will delete all messages from database
router.delete("/delete", async (req, res) => {
  await deleteAllMessages(req, res);
});

module.exports = router;
