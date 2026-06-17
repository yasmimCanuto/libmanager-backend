function validate(schema, target = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);

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

    req[target] = result.data;
    return next();
  };
}

module.exports = {
  validate,
};
