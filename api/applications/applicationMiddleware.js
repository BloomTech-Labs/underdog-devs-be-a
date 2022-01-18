const Application = require('./applicationModel');

exports.validApplicationId = async (req, res, next) => {
  try {
    const application = await Application.getTicketById(req.params.id);
    if (!application) {
      next({ status: 404, message: 'Requested application id not found' });
    } else {
      req.application = application;
      next();
    }
  } catch (err) {
    next();
  }
};
