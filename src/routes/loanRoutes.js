const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validateMiddleware");
const { createLoanSchema, loanIdParamSchema } = require("../schemas/loanSchema");
const {
  listLoans,
  registerLoan,
  returnLoan,
} = require("../controllers/loanController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", listLoans);
router.post("/", validate(createLoanSchema), registerLoan);
router.patch(
  "/:id/devolver",
  validate(loanIdParamSchema, "params"),
  returnLoan
);

module.exports = router;
