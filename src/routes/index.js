const express = require("express");
const { getHealth } = require("../controllers/healthController");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Bem-vinda a API do LibManager",
  });
});

router.get("/health", getHealth);
router.use("/usuarios", userRoutes);

module.exports = router;
