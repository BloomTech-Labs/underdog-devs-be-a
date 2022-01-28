const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
  insertMentorIntake,
  insertMenteeIntake,
} = require('./applicationModel');

const cacheSignUpData = async (req, res, next) => {
  const role = req.params.role;
  const newApplication = req.body;
  const tempProfileId = Math.random().toString(36).slice(-8);
  if (role !== 'mentor' || role !== 'mentee') {
    next({ status: 400, message: 'invalid role name' });
  }
  try {
    if (role === 'mentor') {
      // implement yup please
      insertMentorIntake(tempProfileId, newApplication);
      req.body.position = 3;
      next();
    } else if (role === 'mentee') {
      insertMenteeIntake(tempProfileId, newApplication);
      req.body.position = 4;
      next();
    }
  } catch (err) {
    return next({
      status: 404,
      message: `something went wrong in applicationMiddleware`,
    });
  }
};

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
  cacheSignUpData,
  validateProfile,
  checkRole,
};
