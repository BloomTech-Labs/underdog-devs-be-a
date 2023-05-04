// const Profiles = require('../profile/profileModel');
// const jwt_decode = require('jwt-decode');

const superAdminRequired = async (req, res, next) => {
  // const token = req.headers.authorization;
  // const user = jwt_decode(token);
  // await Profiles.findById(user.sub)
  //   .then((selectedUser) => {
  //     if (selectedUser.role_id == 1) {
  //       next();
  //     } else {
  //       next({
  //         status: 401,
  //         message: 'invalid credentials / not superadmin',
  //       });
  //     }
  //   })
  //   .catch(next);
  next();
};

const adminRequired = (req, res, next) => {
  // const token = req.headers.authorization;
  // const user = jwt_decode(token);

  // Profiles.findById(user.sub)
  //   .then((selectedUser) => {
  //     if (selectedUser.role_name === 'admin') next();
  //     else
  //       next({
  //         status: 401,
  //         message: 'invalid credentials / not admin',
  //       });
  //   })
  //   .catch(next);
  next();
};

const mentorRequired = async (req, res, next) => {
  // const token = req.headers.authorization;
  // const user = jwt_decode(token);
  // await Profiles.findById(user.sub)
  //   .then((selectedUser) => {
  //     if (selectedUser.role_name === 'mentor') {
  //       next();
  //     } else {
  //       next({
  //         status: 401,
  //         message: 'invalid credentials / not mentor',
  //       });
  //     }
  //   })
  //   .catch(next);
  next();
};

module.exports = {
  superAdminRequired,
  adminRequired,
  mentorRequired,
};
