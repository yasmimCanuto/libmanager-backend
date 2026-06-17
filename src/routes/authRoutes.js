const express = require("express");
const { login } = require("../controllers/authController");
const { validate } = require("../middlewares/validateMiddleware");
const { loginSchema } = require("../schemas/authSchema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);

module.exports = router;
