const { create } = require('../profile/profileModel');

const createProfile = async (req, res, next) => {
  const tempProfileId = Math.random().toString(36).slice(-8);
  req.body.profile_id = tempProfileId;
  const newProfile = {
    profile_id: req.body.profile_id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    is_active: true,
    role_id: req.params.role === 'mentor' ? 3 : 4,
  };
  try {
    const profile = await create(newProfile);
    req.profile = profile;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createProfile,
};
