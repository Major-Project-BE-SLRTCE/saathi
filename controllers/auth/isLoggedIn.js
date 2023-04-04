const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/config");

const isLoggedIn = async (req, res) => {
  try {
    // requesting the token saved on the client's machine
    // while logging in last time for authentication
    const authToken = req.cookies.auth;

    // if the user is already logged in
    if (authToken) {
      const authTokenData = jwt.verify(authToken, JWT_SECRET);
      const { userId, username, exp } = authTokenData;

      if (exp + 600000 <= Date.now()) {
        const userDetails = await Users.findOne(
          { _id: userId },
          {
            password: false,
            resetPasswordToken: false,
            resetPasswordTokenExpiryTime: false,
            __v: false
          }
        );

        if (userDetails) {
          res.status(200).json({
            message: `${userDetails.name} is already logged in.`,
            userDetails
          });
        } else {
          res.status(401).json({ message: "User not found." });
        }
      } else {
        res.status(401).json({ message: "Authentication token is expired." });
      }
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (err) {
    console.log("IsLoggedIn Error:\n", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = isLoggedIn;
