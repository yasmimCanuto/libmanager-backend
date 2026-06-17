function getHealth(_req, res) {
  res.status(200).json({
    message: "API do LibManager funcionando",
    status: "ok",
  });
}

module.exports = {
  getHealth,
};
