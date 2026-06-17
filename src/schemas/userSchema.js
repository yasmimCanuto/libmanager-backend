const { z } = require("zod");

const createUserSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no maximo 100 caracteres"),
  email: z.email("Informe um email valido"),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  tipo: z
    .string()
    .min(3, "O tipo deve ter pelo menos 3 caracteres")
    .max(30, "O tipo deve ter no maximo 30 caracteres")
    .optional(),
});

module.exports = {
  createUserSchema,
};
