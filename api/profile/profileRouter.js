const express = require('express');
const authRequired = require('../middleware/authRequired'); //needs to change to real auth0Middleware after auth is fixed
const Profiles = require('./profileModel');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');
const {
  adminRequired,
  superAdminRequired,
} = require('../middleware/permissionsRequired');
const validation = require('../helpers/validation');
const validateSelfUpdate = require('../../data/schemas/userProfileSchema');
const { validateUser } = require('../middleware/validationMiddleware');
const dsService = require('../dsService/dsModel');
validateUser;

//TO-DO: Implement Auth0 using the correct middleware(auth0middleware)

// gets current user profile

router.get('/current_user_profile', authRequired, async (req, res, next) => {
  try {
    req.profile = await Profiles.findById(req.profile.profile_id);
    res.status(200).json(req.profile);
  } catch (err) {
    next({ status: 500, message: err.message });
  }
});

// // gets all profiles

router.get('/', authRequired, adminRequired, async (req, res) => {
  axios
    .get(`${baseURL}/get/all`)
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

//get all profiles by role including matches

router.get('/role/:role', authRequired, adminRequired, (req, res) => {
  if (req.params.role === 'mentor') {
    axios
      .get(`${baseURL}mentor/matches`)
      .then((response) => {
        console.log(`Response`, response);
        res.status(200).json(response.data);
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`${baseURL}/mentee/matches/all/obj`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => console.log(err));
  }
});

router.get('/:id', authRequired, async function (req, res, next) {
  const id = String(req.params.id);
  const attendance_average = await Profiles.checkAverageAttendance(id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        res
          .status(200)
          .json({ ...profile, attendance_rate: attendance_average });
      } else {
        next({ status: 404, message: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// post new mentee/mentor account from application
router.post('/', authRequired, async (req, res, next) => {
  const profile = req.body;
  if (profile) {
    const id = profile.id || 0;
    try {
      await Profiles.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Profiles.create(profile).then((profile) =>
            res
              .status(201)
              .json({ message: 'profile created', profile: profile[0] })
          );
        } else {
          next({ status: 400, message: 'profile already exists' });
        }
      });
    } catch (e) {
      next({ status: 500, message: e.message });
    }
  } else {
    next({ status: 404, message: 'Profile missing' });
  }
});

// update current profile firstname, lastname, email
router.put(
  '/',
  validation(validateSelfUpdate),
  authRequired,
  (req, res, next) => {
    try {
      const changes = req.body;
      const user = req.profile;
      if (changes) {
        Profiles.update(user.profile_id, changes)
          .then(async (updated) => {
            await dsService.postProfileUpdate(updated, updated.role_id);
            res.status(200).json({ updated_profile: updated[0] });
          })
          .catch(() => {
            next({
              status: 500,
              message: `Could not update profile ${user.profile_id}`,
            });
          });
      } else {
        next({
          status: 400,
          message: `Missing or invalid request`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// update profile by id (admin)
router.put('/:id', adminRequired, authRequired, (req, res, next) => {
  try {
    const changes = req.body;
    if (changes) {
      Profiles.update(req.params.id, changes)
        .then(async (updated) => {
          await dsService.postProfileUpdate(updated, updated.role_id);
          res.status(200).json({ updated_profile: updated });
        })
        .catch(() => {
          next({
            status: 500,
            message: `Could not update profile ${req.profile.profile_id}`,
          });
        });
    } else {
      next({
        status: 400,
        message: `Missing or invalid request`,
      });
    }
  } catch (err) {
    next(err);
  }
});

// Activates or deactivates a user depending on what their current is_active status is
router.put(
  '/is_active/:profile_id',
  authRequired,
  superAdminRequired,
  validateUser,
  async (req, res, next) => {
    const { profile_id } = req.params;
    try {
      const profile = await Profiles.findById(profile_id);
      Profiles.updateIsActive(profile_id, profile.is_active);
      if (!profile.is_active) {
        res.status(200).json({ message: 'profile is now active' });
      } else {
        res.status(200).json({ message: 'profile is now inactive' });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Could not update active status of profile with with ID: ${profile_id}`,
      });
    }
  }
);

//get match mentor by profile_id
router.get('/match/:id', authRequired, (req, res, next) => {
  axios
    .post(`${baseURL}/match/${req.params.id}/?n_matches=5`)
    .then((results) => {
      let mentors = [];
      results.data.result.map(async (x) => {
        await Profiles.findById(x).then((mentor) => {
          mentors.push(mentor);
        });
        res.status(200).json({ matches: mentors });
      });
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

//gets all mentors
router.get('/mentor/information', (req, res, next) => {
  axios
    .post(`${baseURL}/read/mentor`, req.body)
    .then((response) => {
      const mentorInfo = response.data.result.map((results) => {
        const data = {
          name: `${results.first_name} ${results.last_name}`,
          city: results.city,
          state: results.state,
          availability: results.accepting_new_mentees,
        };
        return data;
      });
      res.send(mentorInfo);
    })
    .catch((err) => next(err));
});

//gets all mentees
router.get('/mentee/information/', (req, res, next) => {
  axios
    .post(`${baseURL}/read/mentee`, req.body)
    .then((response) => {
      const menteeInfo = response.data.result.map((results) => {
        const data = {
          name: `${results.first_name} ${results.last_name}`,
          city: results.city,
          state: results.state,
          availability: results.accepting_new_mentees,
        };
        return data;
      });
      res.send(menteeInfo);
    })
    .catch((err) => next(err));
});

//mentors posting availablity
router.post('/availability/:profile_id', (req, res, next) => {
  const { profile_id } = req.params;
  const { accepting_new_mentees } = req.body;
  axios
    .post(`${baseURL}/update/mentor/${profile_id}`, {
      accepting_new_mentees,
    })
    // eslint-disable-next-line no-unused-vars
    .then((response) => {
      res.send({ status: response.status, message: response.data });
    })
    .catch((err) => {
      next({
        status: err.status,
        message: err.message,
      });
    });
});

module.exports = router;
