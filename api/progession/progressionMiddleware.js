const { findRoleIdByProfileId } = require('./progressionModel');

const checkIfMentee = async (req, res, next) => {
  const { profile_id } = req.params;
  try {
    const { role_id } = await findRoleIdByProfileId(profile_id);
    if (role_id != 4) {
      res.status(400).json({ message: 'Requested user is not a mentee' });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = checkIfMentee;
