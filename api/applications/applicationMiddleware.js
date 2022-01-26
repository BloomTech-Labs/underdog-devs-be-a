const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
} = require('./applicationModel');

const validateProfile = async (req, res, next) => {
  const profile = await getTicketById(req.params.id);
  try {
    if (profile) {
      req.body = profile;
      next();
    }
  } catch (err) {
    return next({
      status: 404,
      message: `profile_id ${req.params.id} not found`,
    });
  }
};

const checkRole = async (req, res, next) => {
  const profile = req.body;
  try {
    if (profile.role_id === 3) {
      const mentorData = await getMentorIntake(profile.profile_id);
      req.body = mentorData;
      next();
    } else if (req.body.role_id === 4) {
      const menteeData = await getMenteeIntake(profile.profile_id);
      req.body = menteeData;
      next();
    } else {
      next(profile);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateProfile,
  checkRole,
};
