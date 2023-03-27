const User = require("../../models/user");
const validatePassword = require("../../utils/validatePassword");
const hashPassword = require("../../utils/hashPassword");

const updatePassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validating the password
    const [isValidPassword, passwordMsg] = validatePassword(password);

    // if the password is valid
    if (isValidPassword) {
      const hashedPassword = await hashPassword(password);
      const updatePasswordRes = await User.updateOne(
        { username },
        { $set: { password: hashedPassword } }
      );

      if (updatePasswordRes.modifiedCount) {
        res.status(200).json({ message: "Password updated successfully." });
      } else {
        res.status(500).json({ message: "Password updation failed." });
      }
    } else {
      res.status(400).json({ message: passwordMsg });
    }
  } catch (err) {
    console.log("Update Password Error:\n", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = updatePassword;
