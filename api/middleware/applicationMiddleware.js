const axios = require('axios');
// const { baseURL } = require('../../config/dsConfig');
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
const { baseURL } = require('../../config/dsConfig');

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
    tech_stack: formData.tech_stack,
    job_help: formData.job_help,
    pair_programming: formData.pair_programming,
    other_info: formData.other_info,
    referred_by: formData.referred_by,
    validate_status: 'pending',
  };
  const newMentorApplication = {
    ...sharedFields,
    current_company: formData.current_company,
    current_position: formData.current_position,
  };
  const newMenteeApplication = {
    ...sharedFields,
    formerly_incarcerated: formData.formerly_incarcerated,
    convictions: formData.convictions,
    underrepresented_group: formData.underrepresented_group,
    low_income: formData.low_income,
  };

  try {
    if (role === 'mentor') {
      req.body.role_id = 3;
      req.application = newMentorApplication;
      req.role = 'mentor';
      await insertMentorIntake(newMentorApplication);
      next();
    } else {
      req.body.role_id = 4;
      req.application = newMenteeApplication;
      req.role = 'mentee';
      await insertMenteeIntake(newMenteeApplication);
      next();
    }
  } catch (err) {
    next({
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
    next({
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
        next({
          status: 404,
          message: `form data for ${application.profile_id} not found`,
        });
      } else {
        req.intakeData = mentorData;
        mentorData.application_id = application.application_id;
        next();
      }
    }

    if (application.position === 4) {
      const menteeData = await getMenteeIntake(application.profile_id);

      if (!menteeData) {
        next({
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
    next({
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
    next({
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
    next({
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
    next({
      status: 400,
      message: err.errors[0],
    });
  }
};

const sendData = (req, res, next) => {
  console.log(req);
  if (req.role === 'mentee') {
    const mentee = req.application;
    mentee['is_active'] = false;
    mentee['in_project_underdog'] = false;
  } else {
    const mentor = req.application;
    mentor['is_active'] = false;
    mentor['accepting_new_mentees'] = false;
    mentor['commitment'] = false;
    mentor['industry_knowledge'] = false;
  }
  // we are going to leave this middleware in this format due to future changes to the database in the near future. updated 7/27/22.
  axios
    .post(`${process.env.DS_API_URL}/create/${req.role}`, req.application)
    .then((res) => {
      next({ status: res.status, message: res.data });
    })
    .catch(() => {
      next({ status: res.status });
    });
};

const getMentors = (req, res, next) => {

  axios
  .post(`${baseURL}/read/mentor`)
  .then(results => {
    const mentors = results.data.result
    // console.log(mentors)
    res.send(mentors)
    req.role = 'mentor'
  })
  .catch((err) => next(err))
}

const getMentees = (req, res, next) => {
  axios
  .post(`${baseURL}/read/mentee`, req.body = mentors)
  .then(results => {
    const mentees = results.data.result
    // console.log(mentees)
    res.send(mentees)
  })
  .catch((err) => next(err))
}

module.exports = {
  cacheSignUpData,
  checkApplicationExists,
  checkRole,
  findProfile,
  validateApplicationTicket,
  validateMenteeIntakeData,
  validateMentorIntakeData,
  sendData,
  getMentors,
  getMentees,
};
