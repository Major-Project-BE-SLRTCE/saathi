const User = require("../../models/users");
const validatePassword = require("../../utils/validatePassword");
const hashPassword = require("../../utils/hashPassword");
const beautifySchemaErrorMsgs =
  require("../../utils/beautifySchemaErrorMsgs").default;

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
        res.status(201).json({ message: "Account created.", data: userRes });
      } else {
        res.status(500).json({ message: "Account not created.", data: {} });
      }
    } else {
      res.status(400).json({ message: passwordMsg, data: {} });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      message: Object.values(err.errors).map((e) => e.message)
    });
  }
};

module.exports = createUser;
