const express = require("express");
const router = express.Router();

const isLoggedIn = require("../controllers/auth/isLoggedIn");
const login = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");
const forgotPassword = require("../controllers/auth/forgotPassword");
const resetPassword = require("../controllers/auth/resetPassword");

router.get("/is-logged-in", async (req, res) => {
  await isLoggedIn(req, res);
});

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.get("/logout", async (req, res) => {
  await logout(req, res);
});

router.post("/forgot-password", async (req, res) => {
  await forgotPassword(req, res);
});

router.post("/reset-password", async (req, res) => {
  await resetPassword(req, res);
});

module.exports = router;
