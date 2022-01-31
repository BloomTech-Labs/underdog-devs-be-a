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
  };
  try {
    const profile = await create(newProfile);
    if (!profile) {
      res.status(404).json({ message: 'Unable to make profile' });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = { createProfile };
