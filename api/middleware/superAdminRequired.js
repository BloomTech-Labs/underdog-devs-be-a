const Profiles = require('../profile/profileModel');
const jwt_decode = require('jwt-decode');

const superAdminRequired = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token);
  Profiles.findById(user.sub)
    .then((selectedUser) => {
      if (selectedUser.role_id == 1) {
        next();
      } else {
        // throw new Error('Invalid credentials');
        res.status(500).json({ message: 'invalid credentials / not admin' });
      }
    })
    .catch(next);
};

module.exports = superAdminRequired;
