const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { PORT, CLIENT_URL } = require("./utils/config");
const connectToDb = require("./utils/db");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// calling the function, so that it can run
// and connect the server to the database
connectToDb();

// setting up socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      //-- remove localhosts in production
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      CLIENT_URL
    ],
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Authorization"
    ]
  }
});

module.exports = { io };
require("./controllers/message/socketio");

// ----------------------------------------------

app.get("/", (req, res) => {
  res.send("Hey there! I am Saathi. Let's chat :)");
});

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ----------------------------------------------

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}.`);
// });

httpServer.listen(PORT, () => {
  console.log(`Express and Socket servers are running on port ${PORT}.`);
});
