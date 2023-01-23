const bcrypt = require("bcryptjs");

const comparePassword = async (password, hashedPassword) => {
  // "isMatched" will be true or false
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
};

module.exports = comparePassword;
