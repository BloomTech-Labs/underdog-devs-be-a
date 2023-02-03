const express = require('express');
// const authRequired = require('../middleware/authRequired');
const router = express.Router();
const {
  checkApplicationExists,
  checkRole,
} = require('../middleware/applicationMiddleware');
const { v4: uuidv4 } = require('uuid');
const { getAllApplications } = require('./applicationModel');
const validation = require('../helpers/validation');
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');
const { issuer, connection, token } = require('../../config/auth0');
const { passGenerator } = require('../helpers/passGenerator');
const Profiles = require('../profile/profileModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - email
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          description: unique identifier for each profile that references their auth0 and DS API profiles
 *        role:
 *          type: integer
 *          description: integer between 1-4 which sets authorization levels for navigating the app
 *      example:
 *        email: testuser101@gmail.com
 *        role: 3
 */

/**
 * @swagger
 * /application:
 *  post:
 *    summary: Get the list of all applications (mentor and mentees)
 *    description: Provides a JSON array of applications (as objects) for FE to consume and filter.
 *    tags:
 *      - application
 *    security:
 *      - auth0: [authRequired, adminRequired]
 *    parameters:
 *      - in: query
 *        name: application property
 *        schema:
 *          type: object
 *        description: A resource property key to query for
 *    responses:
 *      '200':
 *        description: An array of application objects from MongoDB
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: see above for mentee and mentor examples
 *      '422':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

/*
  Author: Melody McClure
  This post route will read the 'readAllUsers' middleware and send back only the users who have applications in a pending validation status.
  authRequired, and AdminRequired imports have been left (commented out) because they will likely be needed when auth0 is implemented.
*/
router.post('/', (req, res) => {
  console.log(req.body);
  const query = req.body;
  getAllApplications(query)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err.message);
    });
});
// get pending application tickets by role

router.get('/:role', (req, res) => {
  if (req.params.role === 'mentor') {
    res.json([
      {
        profile_id: '5b2t85faI2n133TM',
        first_name: 'User',
        last_name: '6',
        role_name: 'mentor',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 5,
      },
    ]);
  } else {
    res.json([
      {
        profile_id: '1myy2P3Rli1h4873',
        first_name: 'User',
        last_name: '8',
        role_name: 'mentee',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 2,
        low_income: false,
      },
      {
        profile_id: '10',
        first_name: 'User',
        last_name: '10',
        role_name: 'mentee',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 6,
      },
      {
        profile_id: '5b2t85faI2n133TM',
        first_name: 'User',
        last_name: '10',
        role_name: 'mentee',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 6,
        validate_status: 'pending',
      },
    ]);
  }
});

/**
 * @swagger
 * /application/{profileId/:id}:
 *  get:
 *    summary: Get the list of pending applicants by profile ID
 *    description: Provides a JSON array of applications (as objects) where 'approved' key is falsy
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: profile ID
 *        schema:
 *          type: string
 *        description: A request parameter that accepts profile ID
 *    responses:
 *      '200':
 *        description: An array of application objects
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Application'
 *              example:
 *                - profile_id: "00u13omswyZM1xVya4x7"
 *                  first_name: "User"
 *                  last_name: "6"
 *                  role_name: "mentor"
 *                  created_at: "2022-02-02T18:43:53.607Z"
 *                  application_id: 5
 *      '401':
 *        $ref: '#/componengit responses/UnauthorizedError'
 */

// get application by profile id

router.get('/profileId/:id', checkApplicationExists, checkRole, (req, res) => {
  res.status(200).json(req.intakeData);
});

/**
 * @swagger
 * /application/{new/:role}:
 *  post:
 *    summary: Adds a new user profile to the database depending on the role parameter.
 *    description: Posts a new user object to the profiles table using data from the signup form. A profile ID is generated and attached as the profile_id parameter, along with other required fields to be updated on approval. If/when approved, an oauth ID parameter should be added to allow for user authentication. Middleware handles validation of form values to ensure required fields are provided.
 * Note - should caching of mentor/mentee intake data fail, the newly created profile will have to be deleted in order to re-do this process.
 *    tags:
 *      - application
 *    security:
 *      - auth0: [authRequired, adminRequired] (redundant as unauthenticated users need access to this endpoint to submit applications)
 *    parameters:
 *      - in: param
 *        name: role name
 *        schema:
 *          type: string
 *        description: This parameter is used to direct flow of signup form data to our database.
 *    responses:
 *      '200':
 *        description: Response from successful post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  description: Status of the request as a message
 *                  type: string
 *              items:
 *                $ref: '#/components/schemas/Application'
 *              example:
 *                message: 'Application has been submitted'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.post('/new/:role', validation(), async (req, res, next) => {
  let uuid = uuidv4();
  try {
    if (req.params.role === 'mentee') {
      const mentee = req.body;
      mentee['is_active'] = false;
      mentee['in_project_underdog'] = false;
      mentee['profile_id'] = uuid;
    } else {
      const mentor = req.body;
      mentor['is_active'] = false;
      mentor['accepting_new_mentees'] = false;
      mentor['profile_id'] = uuid;
      // mentor['commitment'] = false;
      // mentor['industry_knowledge'] = false;
    }
    console.log(req.body);
    await axios
      .post(`${baseURL}/create/${req.params.role}`, req.body)
      .then((res) => {
        next({ status: res.status, message: res.data });
      });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @swagger
 * /application/update-validate_status/:profile_id:
 *  post:
 *    summary: Updates validate_status of a given user, provisions a new Auth0 user, and inserts a new profile into the Profiles table for that user
 *    description: First, the status flag on the user's profile is updated in the DS API (MongoDB). Second, a corresponding new user is provisioned in Auth0. Third, the new Auth0 user ID is packaged with other information and inserted into the profiles table as a new user profile.
 *    tags:
 *      - application
 *    security:
 *      - auth0: [authRequired, adminRequired] (currently not incorporated into endpoint, but may need to added back after additional Auth0 integration work)
 *    parameters:
 *      - in: param
 *        name: profile id
 *    responses:
 *      '200':
 *        description: Response from successful application / applicant rejection
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: 200
 *                message: 'Mentor / mentee rejected!'
 *      '201':
 *        description: Response from successful application / applicant approval (all three pieces / both calls successful)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: 201
 *                message:  'Mentor / mentee application approved and user created!'
 *      '422':
 *        description: Response from error on first call involving DS API with some failure probably related to MongoDB where status flag update failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: 422
 *                message:  "unexpected value; permitted: 'approved', 'rejected', 'pending'"
 *       '409':
 *         description: Response from error on second call involving Auth0 with some failure related to creating / provisioning a new user
 *         note: many different error responses are possible with many different status codes, the most common one is shown below
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 status: 409
 *                 message:  'User already exists.'
 *      '422':
 *        description: Response from error on third operation involving database operation with some failure related to Postgres where insertion of new profile failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: 422
 *                message:  'insert into \"profiles\" (\"profile_id\", \"role\") values ($1, $2) returning * - null value in column \"user_id\" of relation \"profiles\" violates not-null constraint'
 */

router.post('/update-validate_status/:profile_id', async (req, res, next) => {
  const { role, email, status } = req.body;
  const { profile_id } = req.params;
  let user_id;

  try {
    await axios.post(`${baseURL}/update/${role}/${profile_id}`, {
      validate_status: status,
    });
    if (status === 'rejected') {
      res.json({ status: 200, message: `${role} rejected!` });
      return;
    }
  } catch (err) {
    next({
      status: err.response.status,
      message: err.response.data.detail[0].msg,
    });
    return;
  }

  try {
    const payload = {
      email,
      password: passGenerator(8),
      connection,
    };
    const authData = await axios.post(`${issuer}api/v2/users`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user_id = authData.data.identities[0].user_id;
  } catch (err) {
    next({
      status: err.response.data.statusCode,
      message: `${err.response.data.error}: ${err.response.data.message}`,
    });
    return;
  }

  try {
    const newProfile = {
      user_id,
      profile_id,
      role,
    };

    await Profiles.create(newProfile);
  } catch (err) {
    next({ status: 422, message: err.message });
    return;
  }
  res.json({
    status: 201,
    message: `${role} application approved and user created!`,
  });
});

module.exports = router;
