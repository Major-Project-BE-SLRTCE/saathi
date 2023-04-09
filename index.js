const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { PORT, CLIENT_URL } = require("./utils/config");
const connectToDb = require("./utils/db");
const crypto = require("crypto");

const app = express();
const http = require("http");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
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
  })
);

// calling the function, so that it can run
// and connect the server to the database
connectToDb();

// ----------------------------------------------

app.get("/", (req, res) => {
  res.send("Hey there! I am Saathi. Let's chat :)");
});

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// ----------------------------------------------

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", CLIENT_URL],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("new_message", (data) => {
    replyMessage(data);
  });
  const replyMessage = (data) => {
    const { message, id, self } = data;
    console.log(message, id, self);
    socket.emit("receive_message", {
      message,
      id: crypto.randomUUID(),
      self: false
    });
  };
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
