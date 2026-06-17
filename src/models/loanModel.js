const pool = require("../config/database");

async function findAllLoans() {
  const [rows] = await pool.query(
    `SELECT
      e.id,
      e.usuario_id,
      u.nome AS usuario_nome,
      e.livro_id,
      l.titulo AS livro_titulo,
      e.data_emprestimo,
      e.data_devolucao_prevista,
      e.data_devolucao_real,
      e.status
    FROM emprestimos e
    INNER JOIN usuarios u ON u.id = e.usuario_id
    INNER JOIN livros l ON l.id = e.livro_id
    ORDER BY e.id DESC`
  );

  return rows;
}

async function createLoan({
  usuario_id,
  livro_id,
  data_emprestimo,
  data_devolucao_prevista,
}) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [users] = await connection.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [usuario_id]
    );

    if (!users.length) {
      const error = new Error("Usuario nao encontrado");
      error.code = "USER_NOT_FOUND";
      throw error;
    }

    const [books] = await connection.query(
      "SELECT id, status FROM livros WHERE id = ?",
      [livro_id]
    );

    if (!books.length) {
      const error = new Error("Livro nao encontrado");
      error.code = "BOOK_NOT_FOUND";
      throw error;
    }

    if (books[0].status === "emprestado") {
      const error = new Error("Livro indisponivel para emprestimo");
      error.code = "BOOK_UNAVAILABLE";
      throw error;
    }

    const [result] = await connection.query(
      `INSERT INTO emprestimos
        (usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, status)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, "ativo"]
    );

    await connection.query(
      "UPDATE livros SET status = ? WHERE id = ?",
      ["emprestado", livro_id]
    );

    await connection.commit();

    return {
      id: result.insertId,
      usuario_id,
      livro_id,
      data_emprestimo,
      data_devolucao_prevista,
      status: "ativo",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function returnLoanById(id) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [loans] = await connection.query(
      "SELECT id, livro_id, status FROM emprestimos WHERE id = ?",
      [id]
    );

    if (!loans.length) {
      const error = new Error("Emprestimo nao encontrado");
      error.code = "LOAN_NOT_FOUND";
      throw error;
    }

    if (loans[0].status === "devolvido") {
      const error = new Error("Esse emprestimo ja foi devolvido");
      error.code = "LOAN_ALREADY_RETURNED";
      throw error;
    }

    await connection.query(
      `UPDATE emprestimos
       SET data_devolucao_real = CURDATE(), status = ?
       WHERE id = ?`,
      ["devolvido", id]
    );

    await connection.query(
      "UPDATE livros SET status = ? WHERE id = ?",
      ["disponivel", loans[0].livro_id]
    );

    await connection.commit();

    return {
      id: Number(id),
      livro_id: loans[0].livro_id,
      status: "devolvido",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  findAllLoans,
  createLoan,
  returnLoanById,
};
