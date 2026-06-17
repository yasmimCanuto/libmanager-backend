function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensagem: issue.message,
      }));

      return res.status(400).json({
        message: "Dados invalidos",
        errors,
      });
    }

    req.body = result.data;
    return next();
  };
}

module.exports = {
  validate,
};
