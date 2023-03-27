const User = require("../../models/user");
const validatePassword = require("../../utils/validatePassword");
const hashPassword = require("../../utils/hashPassword");
const beautifySchemaErrorMsgs = require("../../utils/beautifySchemaErrorMsgs");

const createUser = async (req, res) => {
  try {
    const { userType, username, name, email, password } = req.body;

    // validating the password
    const [isValidPassword, passwordMsg] = validatePassword(password);

    // if the password is valid
    if (isValidPassword) {
      const hashedPassword = await hashPassword(password);
      const userDetails = new User({
        userType,
        username,
        name,
        email,
        password: hashedPassword
      });
      const userRes = await userDetails.save();

      if (userRes) {
        res.status(201).json({ message: "Account created." });
      } else {
        res.status(500).json({ message: "Account not created." });
      }
    } else {
      res.status(400).json({ message: passwordMsg });
    }
  } catch (err) {
    console.log("Create User Error:\n", err);
    res.status(400).json({ message: beautifySchemaErrorMsgs(err) });
  }
};

module.exports = createUser;
