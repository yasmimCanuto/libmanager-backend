const express = require("express");
const { getHealth } = require("../controllers/healthController");
const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const categoryRoutes = require("./categoryRoutes");
const loanRoutes = require("./loanRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Bem-vinda a API do LibManager",
  });
});

router.get("/health", getHealth);
router.use("/auth", authRoutes);
router.use("/livros", bookRoutes);
router.use("/categorias", categoryRoutes);
router.use("/emprestimos", loanRoutes);
router.use("/usuarios", userRoutes);

module.exports = router;
