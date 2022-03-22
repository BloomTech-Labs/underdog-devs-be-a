const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = validation;
