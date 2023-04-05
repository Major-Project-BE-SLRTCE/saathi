const logout = async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    res.status(500).json({ message: "Cannot logout. Something went wrong." });
  }
};

module.exports = logout;
