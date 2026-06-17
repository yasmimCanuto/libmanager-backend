const express = require("express");
const {
  listUsers,
  registerUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", listUsers);
router.post("/", registerUser);

module.exports = router;
