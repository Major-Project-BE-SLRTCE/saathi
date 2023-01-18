require("dotenv").config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URI = process.env.MONGO_URI;
const GMAIL = process.env.GMAIL;
const GMAIL_PWD = process.env.GMAIL_PWD;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  CLIENT_URL,
  MONGO_URI,
  GMAIL,
  GMAIL_PWD,
  JWT_SECRET,
};
