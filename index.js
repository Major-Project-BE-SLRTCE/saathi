const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ----------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ----------------------------------------------

app.listen(5000, () => {
  console.log(`Server is running on 5000.`);
});