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

io.on("connection", (socket) => {
  console.log("New client connected.");

  socket.on("message", (data) => {
    console.log("Message received: ", data);
    socket.emit("message", "Aur batao kya chal raha hai?");
  });
});

// module.exports = { io };

// ----------------------------------------------

app.get("/", (req, res) => {
  res.send("Hey there! I am Saathi. Let's chat :)");
});

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/chat", auth, chatRoutes);

// ----------------------------------------------

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}.`);
// });

httpServer.listen(PORT, () => {
  console.log(`Express and Socket servers are running on port ${PORT}.`);
});
