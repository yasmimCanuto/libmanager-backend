const jwt = require("jsonwebtoken");
const env = require("../config/env");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token nao informado",
    });
  }

  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Token invalido",
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token expirado ou invalido",
    });
  }
}

module.exports = {
  authenticateToken,
};
