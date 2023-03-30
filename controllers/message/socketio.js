const io = require("../../index");
const newMessage = require("./newMessage");

io.on("connection", (socket) => {
  // when a new client connects
  console.log("New client connected.");

  // when a client disconnects
  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });

  // when a client sends a message
  socket.on("message_from_client", async (data) => {
    try {
      const { userId, messageBody } = data;

      // saving the message recieved into database
      const clientMessageStatus = await newMessage(data);

      // (BOT's REPLY WILL COME HERE)

      // saving bot's reply into database
      const serverMessageStatus = await newMessage({
        sentByUser: false, // "false" because message is sent by bot
        userId,
        messageBody: `From server: ${messageBody}` // "messageBody" SHOULD BE REPLACED BY BOT'S REPLY
      });

      // sending bot's reply to the client
      socket.emit("message_from_server", {
        messageBody: `From server: ${messageBody}`, // "messageBody" SHOULD BE REPLACED BY BOT'S REPLY
        clientMessageStatus,
        serverMessageStatus
      });
    } catch (err) {
      console.log("New Message Error:\n", err);

      // sending ERROR to the client
      socket.emit("error", { message: "Something went wrong." });
    }
  });
});
