const express = require("express");
const { getHealth } = require("../controllers/healthController");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Bem-vinda a API do LibManager",
  });
});

router.get("/health", getHealth);

module.exports = router;
