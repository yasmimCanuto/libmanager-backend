const bcrypt = require("bcrypt");
const { createUser, findAllUsers } = require("../models/userModel");

async function listUsers(_req, res) {
  try {
    const users = await findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Nao foi possivel listar os usuarios",
      error: error.message,
    });
  }
}

async function registerUser(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        message: "Nome, email e senha sao obrigatorios",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const newUser = await createUser({
      nome,
      email,
      senha_hash: senhaHash,
      tipo: tipo || "bibliotecario",
    });

    return res.status(201).json({
      message: "Usuario cadastrado com sucesso",
      usuario: newUser,
    });
  } catch (error) {
    const isDuplicateEmail = error.code === "ER_DUP_ENTRY";

    return res.status(isDuplicateEmail ? 409 : 500).json({
      message: isDuplicateEmail
        ? "Ja existe um usuario com esse email"
        : "Nao foi possivel cadastrar o usuario",
      error: error.message,
    });
  }
}

module.exports = {
  listUsers,
  registerUser,
};
