const {
  getTicketById,
  getTicketByAppId,
  getMentorIntake,
  getMenteeIntake,
} = require('../applications/applicationModel');

const validateProfile = (req, res, next) => {
  getTicketById(req.params.id).then((profile) => {
    if (profile) {
      next(profile);
    } else {
      next({ status: 404, message: `profile_id ${req.params.id} not found` });
    }
  });
};

const checkRole = async (req, res, next) => {
  const validatedProfile = req.body;
  try {
    if (validatedProfile.role_name === 'mentor') {
      const mentorData = await getMentorIntake(validatedProfile.profile_id);
      next(mentorData);
    } else if (req.body.role_name === 'mentee') {
      const menteeData = await getMenteeIntake(validatedProfile.profile_id);
      next(menteeData);
    } else {
      next(validatedProfile);
    }
  } catch (err) {
    next(err);
  }
};

const validateApplication = async (req, res, next) => {
  let validApplication = await getTicketByAppId(req.params.appId);
  try {
    if (!validApplication) {
      next({ status: 400, message: 'application does not exist' });
    } else {
      req.body = validApplication;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkRoleType = async (req) => {
  console.log('check role hits', req.body);
};

module.exports = {
  validateProfile,
  validateApplication,
  checkRole,
  checkRoleType,
};
