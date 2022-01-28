const Resource = require('../resources/resourcesModel');
const resourceSchema = require('../../data/schemas/resourceSchema');

async function checkResourceIdExists(req, res, next) {
  const { resource_id } = req.params;
  const badIdErr = {
    status: 404,
    message: `Resource with ID ${resource_id} not found!`,
  };
  try {
    const resource = await Resource.findByResourceId(resource_id);
    if (!resource) {
      return next(badIdErr);
    }
    req._resource = resource;
    return next();
  } catch (err) {
    return next(badIdErr);
  }
}

async function validateResource(req, res, next) {
  try {
    const payload = req.body;
    const validatedResource = await resourceSchema.validate(payload);
    req._resource = validatedResource;
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.errors[0],
    });
  }
}

module.exports = { checkResourceIdExists, validateResource };
