const pool = require("../config/database");

async function findAllBooks() {
  const [rows] = await pool.query(
    `SELECT
      l.id,
      l.titulo,
      l.autor,
      l.ano_publicacao,
      l.status,
      l.categoria_id,
      c.nome AS categoria_nome,
      l.created_at
    FROM livros l
    LEFT JOIN categorias c ON c.id = l.categoria_id
    ORDER BY l.created_at DESC`
  );

  return rows;
}

async function createBook({ titulo, autor, ano_publicacao, categoria_id, status }) {
  const normalizedStatus = status || "disponivel";
  const normalizedCategoriaId =
    typeof categoria_id === "number" ? categoria_id : null;

  const [result] = await pool.query(
    `INSERT INTO livros (titulo, autor, ano_publicacao, categoria_id, status)
     VALUES (?, ?, ?, ?, ?)`,
    [titulo, autor, ano_publicacao, normalizedCategoriaId, normalizedStatus]
  );

  return {
    id: result.insertId,
    titulo,
    autor,
    ano_publicacao,
    categoria_id: normalizedCategoriaId,
    status: normalizedStatus,
  };
}

module.exports = {
  findAllBooks,
  createBook,
};
