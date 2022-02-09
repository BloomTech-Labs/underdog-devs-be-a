const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
  insertMentorIntake,
  insertMenteeIntake,
} = require('../applications/applicationModel');
const {
  mentorApplicationSchema,
  menteeApplicationSchema,
  applicationTicketSchema,
} = require('../../data/schemas/applicationSchema');

const cacheSignUpData = async (req, res, next) => {
  const role = req.params.role;
  const formData = req.body;
  const sharedFields = {
    profile_id: formData.profile_id,
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    location: formData.location,
    other_info: formData.other_info,
  };
  const newMentorApplication = {
    ...sharedFields,
    current_comp: formData.current_comp,
    tech_stack: formData.tech_stack,
    can_commit: formData.can_commit,
    how_commit: formData.how_commit,
    other_info: formData.other_info,
  };
  const newMenteeApplication = {
    ...sharedFields,
    lives_in_us: formData.lives_in_us,
    formerly_incarcerated: formData.formerly_incarcerated,
    list_convictions: formData.list_convictions,
    tech_stack: formData.tech_stack,
    experience_level: formData.experience_level,
    your_hope: formData.your_hope,
  };

  try {
    if (role === 'mentor') {
      if (!newMentorApplication.first_name) {
        next({ status: 400, message: 'first_name required' });
      } else if (!newMentorApplication.last_name) {
        next({ status: 400, message: 'last_name required' });
      } else if (!newMentorApplication.email) {
        next({ status: 400, message: 'email required' });
      } else if (!newMentorApplication.location) {
        next({ status: 400, message: 'location required' });
      } else if (!newMentorApplication.can_commit) {
        next({ status: 400, message: 'can_commit required' });
      } else if (!newMentorApplication.tech_stack) {
        next({ status: 400, message: 'tech_stack required' });
      } else {
        req.body.position = 3;
        await insertMentorIntake(newMentorApplication);
        next();
      }
    } else if (role === 'mentee') {
      req.body.position = 4;
      await insertMenteeIntake(newMenteeApplication);
      next();
    }
  } catch (err) {
    return next({
      status: 422,
      message: `There was a problem caching application intake data`,
    });
  }
};

const checkApplicationExists = async (req, res, next) => {
  try {
    const profile = await getTicketById(req.params.id);
    if (profile) {
      req.body = profile;
      next();
    }
  } catch (err) {
    return next({
      status: 404,
      message: `no applications with profile_id: ${req.params.id} were found`,
    });
  }
};

const checkRole = async (req, res, next) => {
  const profile = req.body;
  try {
    if (profile.position === 3) {
      const mentorData = await getMentorIntake(profile.profile_id);
      if (!mentorData) {
        return next({
          status: 404,
          message: `form data for ${profile.profile_id} not found`,
        });
      } else {
        req.intakeData = mentorData;
        mentorData.application_id = profile.application_id;
        next();
      }
    } else if (profile.position === 4) {
      const menteeData = await getMenteeIntake(profile.profile_id);
      if (!menteeData) {
        return next({
          status: 404,
          message: `form data for ${profile.profile_id} not found`,
        });
      } else {
        req.intakeData = menteeData;
        menteeData.application_id = profile.application_id;
        next();
      }
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
  cacheSignUpData,
  checkApplicationExists,
  checkRole,
  validateApplicationTicket,
  validateMenteeIntakeData,
  validateMentorIntakeData,
};
