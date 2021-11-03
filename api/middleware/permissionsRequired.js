const Profiles = require('../profile/profileModel');
const jwt_decode = require('jwt-decode');

const superAdminRequired = async (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token);
  await Profiles.findById(user.sub)
    .then((selectedUser) => {
      if (selectedUser.role_id == 1) {
        next();
      } else {
        res
          .status(500)
          .json({ message: 'invalid credentials / not superadmin' });
      }
    })
    .catch(next);
};

const adminRequired = async (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token);
  await Profiles.findById(user.sub)
    .then((selectedUser) => {
      if (selectedUser.role_id <= 2) {
        next();
      } else {
        res.status(500).json({ message: 'invalid credentials / not admin' });
      }
    })
    .catch(next);
};

module.exports = {
  superAdminRequired,
  adminRequired,
};
