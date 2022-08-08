const { create } = require('../profile/profileModel');
const axios = require('axios');

const createProfile = async (req, res, next) => {
  const tempProfileId = Math.random().toString(36).slice(-8);
  req.body.profile_id = tempProfileId;
  const newProfile = {
    profile_id: req.body.profile_id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    is_active: true,
    role_id: req.params.role === 'mentor' ? 3 : 4,
  };
  try {
    const profile = await create(newProfile);
    req.profile = profile;
    next();
  } catch (err) {
    return next(err);
  }
};

const checkAvailability = (req, res, next) => {
  const current_role = req.body.role_id;
  const profile = req.body.profile_id;
  let status = req.body.accepting_new_mentees;

  axios
    .post(`${process.env.DS_API_URL}/update/${current_role}/${profile}`)
    .then((res) => {
      //Not sure if this logic belongs in the axios call or if it should be written beforehand, ie. on line 28 of the file.
      if (current_role === 'mentor') {
        status = !status;
      }
      next({ status: res.status, message: res.data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createProfile,
  checkAvailability,
};
