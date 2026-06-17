const { z } = require("zod");

const createLoanSchema = z.object({
  usuario_id: z
    .number({ invalid_type_error: "O usuario_id deve ser um numero" })
    .int("O usuario_id deve ser um numero inteiro"),
  livro_id: z
    .number({ invalid_type_error: "O livro_id deve ser um numero" })
    .int("O livro_id deve ser um numero inteiro"),
  data_emprestimo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data_emprestimo deve estar no formato YYYY-MM-DD",
  }),
  data_devolucao_prevista: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data_devolucao_prevista deve estar no formato YYYY-MM-DD",
  }),
});

const loanIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "O id do emprestimo deve ser um numero inteiro positivo"),
});

module.exports = {
  createLoanSchema,
  loanIdParamSchema,
};
