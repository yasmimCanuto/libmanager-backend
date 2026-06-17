const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validateMiddleware");
const { createBookSchema } = require("../schemas/bookSchema");
const { listBooks, registerBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", listBooks);
router.post("/", authenticateToken, validate(createBookSchema), registerBook);

module.exports = router;
