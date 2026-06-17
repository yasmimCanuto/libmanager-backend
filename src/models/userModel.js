const pool = require("../config/database");

async function findAllUsers() {
  const [rows] = await pool.query(
    `SELECT id, nome, email, tipo, created_at
     FROM usuarios
     ORDER BY created_at DESC`
  );

  return rows;
}

async function createUser({ nome, email, senha_hash, tipo }) {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nome, email, senha_hash, tipo)
     VALUES (?, ?, ?, ?)`,
    [nome, email, senha_hash, tipo]
  );

  return {
    id: result.insertId,
    nome,
    email,
    tipo,
  };
}

module.exports = {
  findAllUsers,
  createUser,
};
