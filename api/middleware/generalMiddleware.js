const { findById } = require('../profile/profileModel');

const validateUser = async (req, res, next) => {
  try {
    const user = await findById(req.params.profile_id);
    if (!user) {
      res.status(400).json({ message: 'Requested user not found' });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = { validateUser };
