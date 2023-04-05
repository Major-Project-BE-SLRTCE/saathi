const User = require("../../models/users");
const genResetPwdToken = require("../../utils/genResetPwdToken");
const { CLIENT_URL } = require("../../utils/config");
const sendEmail = require("../../utils/sendEmail");

const forgotPassword = async (req, res) => {
  try {
    const { email, userType } = req.body;
    const findEmail = await User.findOne({ email, userType });

    // if entered email address exists
    // then generate token to reset the password
    // and send the token to the email address
    if (findEmail) {
      const token = await genResetPwdToken(email);

      // if "genResetPwdToken" doesn't encounter any error
      if (token !== "error") {
        const subject = "Password Reset - Saathi";
        const body = `You are receiving this email because you (or someone else) has been requested to change your password of your Saathi account.\n\nBelow is the link provided to reset your password and the link is valid only for 10 minutes.\n${CLIENT_URL}/auth/reset-password/${token}\n\nIf you are not requested for this link, simply ignore this email. The link will automatically expire after 10 minutes.`;

        await sendEmail({ email, subject, body, res });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    } else {
      res.status(404).json({
        message: "Combination of email address and user type does not exists."
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = forgotPassword;
