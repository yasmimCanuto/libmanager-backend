const { createBook, findAllBooks } = require("../models/bookModel");

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

module.exports = {
  listBooks,
  registerBook,
};
