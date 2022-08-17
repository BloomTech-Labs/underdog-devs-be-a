const { findById } = require('../profile/profileModel');

const validateUser = async (req, res, next) => {
  try {
    const user = await findById(req.params.profile_id);
    if (!user) {
      next({ status: 404, message: 'Requested user not found' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateUser };
