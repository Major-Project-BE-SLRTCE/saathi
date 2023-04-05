const User = require("../../models/users");

const readUser = async (req, res) => {
  try {
    const { username } = req.body;
    const userDetails = await User.findOne({ username }).select({
      password: 0,
      resetPasswordToken: 0,
      resetPasswordTokenExpiryTime: 0,
      __v: 0
    });

    if (userDetails) {
      res.status(200).json({ message: "User found.", userDetails });
    } else {
      res.status(400).json({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = readUser;
