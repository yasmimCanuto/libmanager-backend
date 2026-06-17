const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  listUsers,
  registerUser,
} = require("../controllers/userController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", listUsers);
router.post("/", registerUser);

module.exports = router;
