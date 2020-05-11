const express = require("express");
const { authenticate, signup } = require("../controllers/authController");

const router = express.Router();

router.post("/login", authenticate);

router.post("/signup", signup);

module.exports = router;
