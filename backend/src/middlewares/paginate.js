export const paginate = (model) => {
  return async (req, res, next) => {
    try {
      const { page = 1 } = req.query;
      const limit = 6;
      const skip = (page - 1) * limit;

      const [results, total] = await Promise.all([
        model.find().skip(Number(skip)).limit(Number(limit)),
        model.countDocuments()
      ]);

      console.log("Paginate results count:", results.length, "Total:", total);

      res.paginatedResults = {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        data: results
      };

      next();
    } catch (error) {
      console.error("Paginate error:", error);
      res.status(500).json({ message: "Erro ao paginar dados", error });
    }
  };
};