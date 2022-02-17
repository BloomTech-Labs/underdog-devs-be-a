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
    country: formData.country,
    state: formData.state,
    city: formData.city,
    experience_level: formData.experience_level,
    front_end: formData.front_end,
    back_end: formData.back_end,
    full_stack: formData.full_stack,
    ux_design: formData.ux_design,
    android_mobile: formData.android_mobile,
    ios_mobile: formData.ios_mobile,
    industry_knowledge: formData.industry_knowledge,
    job_search: formData.job_search,
    career_development: formData.career_development,
    pair_programming: formData.pair_programming,
    other_info: formData.other_info,
  };
  const newMentorApplication = {
    ...sharedFields,
    current_comp: formData.current_comp,
    other_info: formData.other_info,
  };
  const newMenteeApplication = {
    ...sharedFields,
    formerly_incarcerated: formData.formerly_incarcerated,
    list_convictions: formData.list_convictions,
    underrepresented_group: formData.underrepresented_group,
    low_income: formData.low_income,
  };

  try {
    if (role === 'mentor') {
      if (!newMentorApplication.first_name) {
        next({ status: 400, message: 'first_name required' });
      } else if (!newMentorApplication.last_name) {
        next({ status: 400, message: 'last_name required' });
      } else if (!newMentorApplication.email) {
        next({ status: 400, message: 'email required' });
      } else if (!newMentorApplication.country) {
        next({ status: 400, message: 'country required' });
      } else if (!newMentorApplication.state) {
        next({ status: 400, message: 'state required' });
      } else if (!newMentorApplication.city) {
        next({ status: 400, message: 'city required' });
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
      message: err,
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
