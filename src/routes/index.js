const express = require("express");
const { getHealth } = require("../controllers/healthController");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Bem-vinda a API do LibManager",
  });
});

router.get("/health", getHealth);
router.use("/auth", authRoutes);
router.use("/usuarios", userRoutes);

module.exports = router;
