const { z } = require("zod");

const createBookSchema = z.object({
  titulo: z
    .string()
    .min(1, "O titulo e obrigatorio")
    .max(150, "O titulo deve ter no maximo 150 caracteres"),
  autor: z
    .string()
    .min(1, "O autor e obrigatorio")
    .max(120, "O autor deve ter no maximo 120 caracteres"),
  ano_publicacao: z
    .number({ invalid_type_error: "O ano de publicacao deve ser um numero" })
    .int("O ano de publicacao deve ser um numero inteiro")
    .min(0, "O ano de publicacao deve ser valido")
    .max(2100, "O ano de publicacao deve ser valido"),
  categoria_id: z
    .number({ invalid_type_error: "A categoria_id deve ser um numero" })
    .int("A categoria_id deve ser um numero inteiro")
    .optional(),
  status: z
    .enum(["disponivel", "emprestado"], {
      invalid_type_error: "O status deve ser disponivel ou emprestado",
    })
    .optional(),
});

const updateBookSchema = createBookSchema;

const bookIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "O id do livro deve ser um numero inteiro positivo"),
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  bookIdParamSchema,
};
