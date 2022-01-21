const resourceSchema = require('../schemas/resourceSchema');

async function validateResource(req, res, next) {
  try {
    const payload = req.body;
    const validatedResource = await resourceSchema.validate(payload);
    req._resource = validatedResource;
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.error[0],
    });
  }
}

module.exports = { validateResource };
