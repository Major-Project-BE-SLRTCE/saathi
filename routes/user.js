const express = require("express");
const router = express.Router();

const createUser = require("../controllers/user/createUser");
const readUser = require("../controllers/user/readUser");
const deleteUser = require("../controllers/user/deleteUser");
const updatePassword = require("../controllers/user/updatePassword");

router.post("/create", async (req, res) => {
  await createUser(req, res);
});

router.get("/read", async (req, res) => {
  await readUser(req, res);
});

router.delete("/delete", async (req, res) => {
  await deleteUser(req, res);
});

router.patch("/update-password", async (req, res) => {
  await updatePassword(req, res);
});

module.exports = router;
