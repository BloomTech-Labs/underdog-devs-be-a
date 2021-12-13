const { findByProfileId } = require('./rolesModel');

const validateRoleId = (req, res, next) => {
  const { role_id } = req.body;
  if (role_id > 5 || role_id < 2) {
    res.status(400).json({ message: 'Invalid role_id. Valid ids are 2-5' });
  } else {
    next();
  }
};

const checkCurrentRoleId = async (req, res, next) => {
  const { profile_id } = req.params;
  const current_role = req.body.role_id;
  try {
    const { role_id } = await findByProfileId(profile_id);
    if (current_role == role_id) {
      res.status(400).json({
        message: 'This is already their current role',
      });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = { validateRoleId, checkCurrentRoleId };
