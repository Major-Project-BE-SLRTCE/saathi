const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const generateJwt = (userId, username) => {
  const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = generateJwt;
