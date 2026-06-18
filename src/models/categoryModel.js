const pool = require("../config/database");

async function findAllCategories() {
  const [rows] = await pool.query(
    `SELECT id, nome
     FROM categorias
     ORDER BY nome ASC`
  );

  return rows;
}

module.exports = {
  findAllCategories,
};
