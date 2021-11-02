// const Profiles = require('../profile/profileModel');

const superAdminRequired = async (req, res, next) => {
  const { role_id } = req.body;
  role_id != 1
    ? res.status(401).json({ message: 'Invalid credentials.' })
    : next();
};

module.exports = superAdminRequired;
