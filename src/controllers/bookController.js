const {
  createBook,
  findAllBooks,
  updateBookById,
  deleteBookById,
} = require("../models/bookModel");

async function listBooks(_req, res) {
  try {
    const books = await findAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel listar os livros",
      error: error.message,
    });
  }
}

async function registerBook(req, res) {
  try {
    const { titulo, autor, ano_publicacao, categoria_id, status } = req.body;

    const newBook = await createBook({
      titulo,
      autor,
      ano_publicacao,
      categoria_id,
      status,
    });

    return res.status(201).json({
      message: "Livro cadastrado com sucesso",
      livro: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel cadastrar o livro",
      error: error.message,
    });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor, ano_publicacao, categoria_id, status } = req.body;

    const result = await updateBookById(id, {
      titulo,
      autor,
      ano_publicacao,
      categoria_id,
      status,
    });

    if (!result.affectedRows) {
      return res.status(404).json({
        message: "Livro nao encontrado",
      });
    }

    return res.status(200).json({
      message: "Livro atualizado com sucesso",
      livro: result.livro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel atualizar o livro",
      error: error.message,
    });
  }
}

async function removeBook(req, res) {
  try {
    const { id } = req.params;
    const affectedRows = await deleteBookById(id);

    if (!affectedRows) {
      return res.status(404).json({
        message: "Livro nao encontrado",
      });
    }

    return res.status(200).json({
      message: "Livro removido com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel remover o livro",
      error: error.message,
    });
  }
}

module.exports = {
  listBooks,
  registerBook,
  updateBook,
  removeBook,
};
