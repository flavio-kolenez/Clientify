export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      status: "fail",
      errors,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message || "Erro interno de servidor",
  });
};
