const { findProfileByRoleId } = require('./progressionModel');

const checkIfMentee = async (req, res, next) => {
  const { profile_id } = req.params;
  try {
    const { role_id } = await findProfileByRoleId(profile_id);
    if (role_id != 4) {
      next({
        status: 400,
        message: 'User is not a mentee',
      });
    } else {
      next();
    }
  } catch (err) {
    next;
  }
};

module.exports = checkIfMentee;
