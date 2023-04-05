const crypto = require("crypto");
const User = require("../models/users");

const genResetPwdToken = async (email) => {
  try {
    let token;

    while (true) {
      token = crypto.randomBytes(20).toString("hex"); // generating the token

      // checking whether the token is already present in the database or not
      const findTokenInUser = await User.find({ resetPasswordToken: token });

      if (findTokenInUser.length) {
        // if the token is already present in the database
        continue;
      } else {
        // if the token is not present in the database
        // then update the user's resetPasswordToken and resetPasswordTokenExpiryTime
        await User.updateOne(
          { email },
          {
            resetPasswordToken: token,
            resetPasswordTokenExpiryTime: Date.now() + 600000 // token will be valid for 10 minutes
          }
        );

        break;
      }
    }

    return token;
  } catch (err) {
    return "error";
  }
};

module.exports = genResetPwdToken;
