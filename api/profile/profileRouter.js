const express = require('express');

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

router.post('/current_user_profile', async (req, res, next) => {
  try {
    let profile = await Profiles.findById(req.body.sub);
    let tempProfile = await Profiles.findTempById(req.body.sub);

    if (profile === undefined && tempProfile === undefined) {
      await Profiles.createTemp({
        profile_id: req.body.sub,
        role: req.body[
          `${process.env.REACT_APP_AUTH0_IDTOKEN_IDENTIFIER}/role`
        ],
        email: req.body.email,
      });

      res.status(200).json({
        tempProfile: true,
        role: req.body[
          `${process.env.REACT_APP_AUTH0_IDTOKEN_IDENTIFIER}/role`
        ],
      });
    } else if (profile === undefined && tempProfile) {
      res.status(200).json({ tempProfile: true, role: tempProfile.role });
    } else if (profile.role === 'admin') {
      profile ? res.status(200).json(profile) : console.log('searching...');
    } else {
      axios
        .post(`${baseURL}/read/${profile.role}`, {
          profile_id: profile.profile_id,
        })
        .then((userInfo) => {
          res
            .status(200)
            .json({ ...userInfo.data.result[0], role: profile.role });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (err) {
    next({ status: 500, message: err.message });
  }
});

// gets all profiles

router.get('/', adminRequired, async (req, res) => {
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

router.get('/role/:role', adminRequired, (req, res) => {
  if (req.params.role === 'mentor') {
    axios
      .get(`${baseURL}/matches/all/obj`)
      .then((response) => {
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

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /profile:
 *  get:
 *    description: Returns a list of profiles
 *    summary: Get a list of all profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    responses:
 *      200:
 *        description: array of profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/:id', async function (req, res, next) {
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

/**
 * @swagger
 * /profile:
 *  post:
 *    summary: Add a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 *      201:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */

// post new mentee/mentor account from application
router.post('/', async (req, res, next) => {
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
router.put('/', validation(validateSelfUpdate), (req, res, next) => {
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
});

// update profile by id (admin)
router.put('/:id', adminRequired, (req, res, next) => {
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
router.get('/match/:id', (req, res, next) => {
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
