const User = require("../../models/users");
const validatePassword = require("../../utils/validatePassword");
const comparePassword = require("../../utils/comparePassword");
const generateJwt = require("../../utils/generateJwt");

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const userRes = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    // if entered username or email address exists
    if (userRes) {
      // validating the password
      const [isValidPassword, passwordError] = validatePassword(password);

      // if the password is valid
      if (isValidPassword) {
        const hashedPassword = userRes.password;

        // isPasswordMatched will be true or false
        const isPasswordMatched = await comparePassword(
          password,
          hashedPassword
        );

        // if the password is matched
        if (isPasswordMatched) {
          // generating JWT token
          const token = generateJwt(userRes._id, userRes.username);

          // saving the token in the cookie on client's machine
          res.cookie("auth", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
          });

          res.status(200).json({
            message: "Logged in successfully.",
            userId: userRes._id,
            username: userRes.username
          });
        } else {
          res.status(400).json({ message: "Password not matched." });
        }
      } else {
        res.status(400).json({ message: passwordError });
      }
    } else {
      res
        .status(404)
        .json({ message: "Entered username or email address is not found." });
    }
  } catch (err) {
    console.log("Login Error:\n", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = login;
