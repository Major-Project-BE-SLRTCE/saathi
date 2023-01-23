const express = require("express");
const router = express.Router();

const login = require("../controllers/auth/login");
const forgotPassword = require("../controllers/auth/forgotPassword");
const resetPassword = require("../controllers/auth/resetPassword");

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.post("/forgot-password", async (req, res) => {
  await forgotPassword(req, res);
});

router.post("/reset-password", async (req, res) => {
  await resetPassword(req, res);
});

module.exports = router;