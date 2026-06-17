const {
  findAllLoans,
  createLoan,
  returnLoanById,
} = require("../models/loanModel");

async function listLoans(_req, res) {
  try {
    const loans = await findAllLoans();

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel listar os emprestimos",
      error: error.message,
    });
  }
}

async function registerLoan(req, res) {
  try {
    const { usuario_id, livro_id, data_emprestimo, data_devolucao_prevista } =
      req.body;

    const newLoan = await createLoan({
      usuario_id,
      livro_id,
      data_emprestimo,
      data_devolucao_prevista,
    });

    return res.status(201).json({
      message: "Emprestimo cadastrado com sucesso",
      emprestimo: newLoan,
    });
  } catch (error) {
    const errorStatusMap = {
      USER_NOT_FOUND: 404,
      BOOK_NOT_FOUND: 404,
      BOOK_UNAVAILABLE: 409,
    };

    return res.status(errorStatusMap[error.code] || 500).json({
      message: error.message || "Nao foi possivel cadastrar o emprestimo",
      error: error.code ? undefined : error.message,
    });
  }
}

async function returnLoan(req, res) {
  try {
    const { id } = req.params;
    const updatedLoan = await returnLoanById(id);

    return res.status(200).json({
      message: "Livro devolvido com sucesso",
      emprestimo: updatedLoan,
    });
  } catch (error) {
    const errorStatusMap = {
      LOAN_NOT_FOUND: 404,
      LOAN_ALREADY_RETURNED: 409,
    };

    return res.status(errorStatusMap[error.code] || 500).json({
      message: error.message || "Nao foi possivel devolver o livro",
      error: error.code ? undefined : error.message,
    });
  }
}

module.exports = {
  listLoans,
  registerLoan,
  returnLoan,
};
