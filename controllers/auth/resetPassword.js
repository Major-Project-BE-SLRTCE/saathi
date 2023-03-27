const User = require("../../models/user");
const validatePassword = require("../../utils/validatePassword");
const hashPassword = require("../../utils/hashPassword");

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // validating the password
    const [isValidPassword, passwordMsg] = validatePassword(password);

    // if the password is valid
    if (isValidPassword) {
      // check if the token is valid
      const findToken = await User.findOne({ resetPasswordToken: token });

      // if token is valid
      // then check whether the token is expired or not
      if (findToken) {
        if (Date.now() <= findToken.resetPasswordTokenExpiryTime) {
          const hashedPassword = await hashPassword(password);

          const updatePasswordRes = await User.updateOne(
            { resetPasswordToken: token },
            {
              $set: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiryTime: null
              }
            }
          );

          if (updatePasswordRes.modifiedCount) {
            res.status(200).json({ message: "Password updated successfully." });
          } else {
            // if password updation failed then
            // set the resetPasswordToken and resetPasswordTokenExpiryTime to null
            await User.updateOne(
              { resetPasswordToken: token },
              {
                $set: {
                  resetPasswordToken: null,
                  resetPasswordTokenExpiryTime: null
                }
              }
            );

            res.status(500).json({ message: "Password updation failed." });
          }
        } else {
          res.status(400).json({ message: "Token expired." });
        }
      } else {
        res.status(400).json({ message: "Invalid token." });
      }
    } else {
      res.status(400).json({ message: passwordMsg });
    }
  } catch (err) {
    console.log("Reset Password Error:\n", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = resetPassword;
