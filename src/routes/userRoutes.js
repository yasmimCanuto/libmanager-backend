const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validateMiddleware");
const {
  listUsers,
  registerUser,
} = require("../controllers/userController");
const { createUserSchema } = require("../schemas/userSchema");

const router = express.Router();

router.use(authenticateToken);

router.get("/", listUsers);
router.post("/", validate(createUserSchema), registerUser);

module.exports = router;
