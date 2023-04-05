const jwt = require("jsonwebtoken");
const Users = require("../models/users");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      const message = "No auth token found. Access denied.";

      res.status(401).json({ message });

      next(message);
    } else {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      const { userId, exp } = tokenData;

      if (exp + 3600000 <= Date.now()) {
        const userDetails = await Users.findOne({ _id: userId });

        if (!userDetails) {
          const message = "User not found.";

          res.status(404).json({ message });

          next(message);
        } else {
          next();
        }
      } else {
        const message = "Auth token expired.";

        res.status(400).json({ message });

        next(message);
      }
    }
  } catch (err) {
    const message = "Unauthorized: No auth token provided.";

    res.status(401).json({ message });

    next(message);
  }
};

module.exports = auth;
