const User = require("../../models/users");

const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;
    const userRes = await User.deleteOne({ username });

    if (userRes.deletedCount) {
      res.status(200).json({ message: "Account deleted.", userRes });
    } else {
      res.status(404).json({ message: "Account not deleted." });
    }
  } catch (err) {
    console.log("Delete user Error:\n", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = deleteUser;
