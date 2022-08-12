const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('./profileModel');
const router = express.Router();
const axios = require('axios');
const {
  adminRequired,
  superAdminRequired,
} = require('../middleware/permissionsRequired');
const validation = require('../helpers/validation');
const validateSelfUpdate = require('../../data/schemas/userProfileSchema');
const { validateUser } = require('../middleware/generalMiddleware');
const dsService = require('../dsService/dsModel');
validateUser;

// gets current user profile

router.get('/current_user_profile/', authRequired, async (req, res, next) => {
  try {
    req.profile = await Profiles.findById(req.profile.profile_id);
    res.status(200).json(req.profile);
  } catch (err) {
    next({ status: 500, message: err.message });
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
router.get('/', authRequired, adminRequired, function (req, res, next) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    profile_id:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /profile/{id}:
 *  get:
 *    description: Find profiles by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profile_id'
 *    responses:
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 */
router.get(
  '/:id',
  authRequired,

  async function (req, res, next) {
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
  }
);

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
/**
 * @swagger
 * /profile:
 *  put:
 *    summary: Update a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
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
/**
 * @swagger
 * /profile/is_active/:profile_id:
 *  put:
 *    summary: Update a is_active filed in for the profile table.
 *    security:
 *      - okta: [authRequired,superAdminRequired,validateUser]
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to updated is_active
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
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
    .post(`${process.env.DS_API_URL}/match/${req.params.id}/?n_matches=5`)
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

/*
*Author: Melody McClure
This post route goes to the DS API which does not accept a GET request for the information wanted in the service ticket.
If the DS API allows that get request in the future, this route should be updated accordingly.
This route was also built while the authorization tool was being changed from Okta to AuthO so there is currently not an authorization middleware in the route. Once that is completed, the middleware confirming this route is for use by admins only.
*/

router.post('/mentor-information/', (req, res, next) => {
  axios
    .post(`${process.env.DS_API_URL}/read/mentor`, req.body)
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

module.exports = router;
