const {
  mentorApplicationSchema,
  menteeApplicationSchema,
} = require('../../data/schemas/applicationSchema');

const validation = () => async (req, res, next) => {
  const body = req.body;
  const schema =
    req.params.role === 'mentor'
      ? mentorApplicationSchema
      : menteeApplicationSchema;
  try {
    await schema.validate(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = validation;
