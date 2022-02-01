const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
} = require('../applications/applicationModel');
const {
  mentorApplicationSchema,
  menteeApplicationSchema,
  applicationTicketSchema,
} = require('../../data/schemas/applicationSchema');

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

const validateApplicationTicket = async (req, res, next) => {
  const payload = req.body;
  try {
    await applicationTicketSchema.validate(payload);
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.errors[0],
    });
  }
};

const validateMenteeIntakeData = async (req, res, next) => {
  const payload = req.body;
  try {
    await menteeApplicationSchema.validate(payload);
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.errors[0],
    });
  }
};

const validateMentorIntakeData = async (req, res, next) => {
  const payload = req.body;
  try {
    await mentorApplicationSchema.validate(payload);
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.errors[0],
    });
  }
};

module.exports = {
  validateProfile,
  checkRole,
  validateApplicationTicket,
  validateMenteeIntakeData,
  validateMentorIntakeData,
};
