const {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
} = require('./applicationModel');

const checkRole = async (req, res, next) => {
  const profileExists = await getTicketById(req.params.id);
  try {
    if (!profileExists) {
      next({ status: 400, message: 'Invalid profile_id' });
    }
    if (profileExists.role_name === 'mentor') {
      const mentorData = await getMentorIntake(profileExists.profile_id);
      next(mentorData);
    } else if (profileExists.role_name === 'mentee') {
      const menteeData = await getMenteeIntake(profileExists.profile_id);
      next(menteeData);
    } else {
      next(profileExists);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkRole };
