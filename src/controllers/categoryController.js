const { findAllCategories } = require("../models/categoryModel");

async function listCategories(_req, res) {
  try {
    const categories = await findAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel listar as categorias",
      error: error.message,
    });
  }
}

module.exports = {
  listCategories,
};
