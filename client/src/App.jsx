import { useState, useEffect } from "react";
import socket from "./utils/socketio";
import "./App.css";

function App() {
  const [messageBody, setMessageBody] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  socket.on("connect", () => {
    console.log("Connected to server.");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server.");
  });

  // sending message to server
  const sendMessage = (e, socket, messageBody) => {
    e.preventDefault();
    setAllMessages((allMessages) => [...allMessages, { sent: messageBody }]);

    socket.emit("message_from_client", {
      sentByUser: true,
      userId: "63ce206e9783abb439c691f0",
      messageBody
    });

    setMessageBody("");
  };

  useEffect(() => {
    socket.on("message_from_server", (data) => {
      setAllMessages((allMessages) => [
        ...allMessages,
        { rec: data.messageBody }
      ]);
    });
  }, [socket]);

  // receiving message from server
  // socket.on("message_from_server", (data) => {
  //   console.log(data);
  // });

  // error handling
  socket.on("error", (err) => {
    console.log(err);
  });

  return (
    <div className="App">
      <h1>Saathi</h1>

      <form onSubmit={(e) => sendMessage(e, socket, messageBody)}>
        <div className="card">
          <input
            type="text"
            placeholder="Enter your message"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">Send Message</button>
        </div>
      </form>

      <br />
      <br />
      {JSON.stringify(allMessages)}
    </div>
  );
}

export default App;
