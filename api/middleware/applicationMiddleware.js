const axios = require('axios');
const { config } = require('../../config/dsConfig');

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
const { findById } = require('../profile/profileModel');

// will change to send data directly to DS BE in the future
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
    subject: formData.subject,
    industry_knowledge: formData.industry_knowledge,
    job_help: formData.job_help,
    pair_programming: formData.pair_programming,
    other_info: formData.other_info,
    validateStatus: 'pending',
  };
  const newMentorApplication = {
    ...sharedFields,
    current_comp: formData.current_comp,
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
      req.body.position = 3;
      req.application = newMentorApplication;
      req.role = 'Mentors';
      await insertMentorIntake(newMentorApplication);
      next();
    } else {
      req.body.position = 4;
      req.application = newMenteeApplication;
      req.role = 'Mentees';
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
  const application = await getTicketById(req.params.id);

  if (application) {
    req.application = application;
    next();
  } else {
    return next({
      status: 404,
      message: `no applications with profile_id: ${req.params.id} were found`,
    });
  }
};

const checkRole = async (req, res, next) => {
  const application = req.application;
  try {
    if (application.position === 3) {
      const mentorData = await getMentorIntake(application.profile_id);
      if (!mentorData) {
        return next({
          status: 404,
          message: `form data for ${application.profile_id} not found`,
        });
      } else {
        req.intakeData = mentorData;
        mentorData.application_id = application.application_id;
        next();
      }
    } else if (application.position === 4) {
      const menteeData = await getMenteeIntake(application.profile_id);
      if (!menteeData) {
        return next({
          status: 404,
          message: `form data for ${application.profile_id} not found`,
        });
      } else {
        req.intakeData = menteeData;
        menteeData.application_id = application.application_id;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

const findProfile = async (req, res, next) => {
  const profile = await findById(req.params.id);

  if (profile) {
    req.profile = profile;
    next();
  } else {
    return next({
      status: 404,
      message: `no profiles with profile_id: ${req.params.id} were found`,
    });
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

const sendData = (req, res, next) => {
  axios
    .post(`${config.baseURL}/${req.role}/create`, req.application)
    .then((res) => {
      next({ status: res.status, message: res.data });
    })
    .catch((err) => {
      next({ status: res.status, message: err });
    });
};

module.exports = {
  cacheSignUpData,
  checkApplicationExists,
  checkRole,
  findProfile,
  validateApplicationTicket,
  validateMenteeIntakeData,
  validateMentorIntakeData,
  sendData,
};
