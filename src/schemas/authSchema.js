const { z } = require("zod");

const loginSchema = z.object({
  email: z.email("Informe um email valido"),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

module.exports = {
  loginSchema,
};
