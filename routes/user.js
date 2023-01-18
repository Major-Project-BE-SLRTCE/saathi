const express = require("express");
const router = express.Router();

const createUser = require("../controllers/user/createUser");

router.post("/create", async (req, res) => {
  await createUser(req, res);
});

module.exports = router;
