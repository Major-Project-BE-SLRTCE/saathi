const User = require("../../models/users");

const createUser = async (req, res) => {
  try {
    const { userType, username, name, email, password } = req.body;
    const userDetails = new User({ userType, username, name, email, password });
    const userRes = await userDetails.save();

    if (userRes) {
      res.status(201).json({ message: "Account created." });
    } else {
      res.status(500).json({ message: "Account not created." });
    }
  } catch (err) {
    console.log("Error:\n" + err);
    res.status(500).json({ message: err });
  }
};

module.exports = createUser;
