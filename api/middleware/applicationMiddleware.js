const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
  insertMentorIntake,
  insertMenteeIntake,
} = require('./applicationModel');

const cacheSignUpData = async (req, res, next) => {
  const role = req.params.role;
  const formData = req.body;
  const newApplication = {
    name: formData.name,
    email: formData.email,
    location: formData.location,
    current_comp: formData.current_comp,
    tech_stack: formData.tech_stack,
    can_commit: formData.can_commit,
    how_commit: formData.how_commit,
    other_info: formData.other_info,
  };
  const tempProfileId = Math.random().toString(36).slice(-8);
  try {
    if (role === 'mentor') {
      console.log('mentee pipeline hit');
      // implement yup please
      if (!newApplication.name) {
        next({ status: 400, message: 'name required' });
      } else if (!newApplication.email) {
        next({ status: 400, message: 'email required' });
      } else if (!newApplication.location) {
        next({ status: 400, message: 'location required' });
      } else if (!newApplication.can_commit) {
        next({ status: 400, message: 'can_commit required' });
      } else if (!newApplication.tech_stack) {
        next({ status: 400, message: 'tech_stack required' });
      } else {
        req.body.profile_id = tempProfileId;
        req.body.position = 3;
        insertMentorIntake(tempProfileId, newApplication)
          .then(() => {
            next();
          })
          .catch(next);
      }
    } else if (role === 'mentee') {
      console.log('mentee pipeline hit');
      // validation
      req.body.position = 4;
      insertMenteeIntake(tempProfileId, newApplication);
      next();
    }
  } catch (err) {
    return next({
      status: 404,
      message: `something went wrong in applicationMiddleware`,
    });
  }
};

// const createNewApplication = async (req, res, next) => {
//   const newApplication = req.body;
//   await add(newApplication.profile_id, newApplication)
//     .then(() => {
//       res.status(201).json({ message: 'Application has been submitted' });
//     })
//     .catch(next);
// }

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
