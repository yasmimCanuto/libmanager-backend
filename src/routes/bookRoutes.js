const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validateMiddleware");
const {
  createBookSchema,
  updateBookSchema,
  bookIdParamSchema,
} = require("../schemas/bookSchema");
const {
  listBooks,
  registerBook,
  updateBook,
  removeBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", listBooks);
router.post("/", authenticateToken, validate(createBookSchema), registerBook);
router.put(
  "/:id",
  authenticateToken,
  validate(bookIdParamSchema, "params"),
  validate(updateBookSchema),
  updateBook
);
router.delete(
  "/:id",
  authenticateToken,
  validate(bookIdParamSchema, "params"),
  removeBook
);

module.exports = router;
