const express = require('express');
const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  cacheSignUpData,
  checkApplicationExists,
  checkRole,
  sendData,
  findProfile,
} = require('../middleware/applicationMiddleware');
const { createProfile } = require('../middleware/profilesMiddleware');
const { registerOktaUser } = require('../middleware/oktaAuth');
const validation = require('../helpers/validation');
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

/**
 * @swagger
 * components:
 *  schemas:
 *    Application:
 *      type: object
 *      required:
 *        - position
 *        - profile_id
 *      properties:
 *        application_id:
 *          type: integer
 *          description: Unique primary key referencing the application's numeric ID
 *        position:
 *          type: integer
 *          description: Foreign key referencing a numeric role ID for an applicant's desired position
 *        profile_id:
 *          type: string
 *          description: Foreign key referencing the applicant's profile ID
 *        approved:
 *          type: boolean
 *          description: Status of whether or not an application has been approved - defaults to false
 *        created_at:
 *          type: timestamp
 *          description: Record of an application's creation time
 *      example:
 *        application_id: 1
 *        position: 4
 *        profile_id: "10"
 *        approved: false
 *        created_at: "2021-11-01T17:59:02.023Z"
 */

/**
 * @swagger
 * /application:
 *  get:
 *    summary: Get the list of all pending applications
 *    description: Provides a JSON array of applications (as objects) where 'approved' key is falsy
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: query
 *        name: application property
 *        schema:
 *          type: string
 *        description: A resource property key to query for - accepts partial matching
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
 *                - profile_id: "10"
 *                  first_name: "User"
 *                  last_name: "10"
 *                  role_name: "mentee"
 *                  created_at: "2022-02-02T18:43:53.607Z"
 *                  application_id: 6
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// get all pending application tickets
// const dummyData = [
//   {
//     profile_id: '00u13omswyZM1xVya4x7',
//     first_name: 'User',
//     last_name: '6',
//     role_name: 'mentor',
//     created_at: '2022-03-11T22:34:47.794Z',
//     application_id: 5,
//     application_notes: '',
//     email: 'llama006@maildrop.cc',
//   },
//   {
//     profile_id: '10',
//     first_name: 'User',
//     last_name: '10',
//     role_name: 'mentee',
//     created_at: '2022-03-11T22:34:47.794Z',
//     application_id: 6,
//     application_notes: '',
//     email: 'llama0010@maildrop.cc',
//   },
//   {
//     profile_id: '00u13oned0U8XP8Mb4x7',
//     first_name: 'User',
//     last_name: '8',
//     role_name: 'mentee',
//     created_at: '2022-03-11T22:34:47.794Z',
//     application_id: 2,
//     application_notes: '',
//     email: 'llama008@maildrop.cc',
//   },
//   {
//     profile_id: '12',
//     first_name: 'User',
//     last_name: '12',
//     role_name: 'pending',
//     created_at: '2022-03-11T22:34:47.794Z',
//     application_id: 1,
//     application_notes: '',
//     email: 'llama0012@maildrop.cc',
//   },
// ];
router.get('/', authRequired, adminRequired, async (req, res, next) => {
  try {
    const requestedApplications = await Application.getApplications();
    res.status(200).json(requestedApplications);
  } catch (err) {
    next({ message: err.message });
  }
});

/**
 * @swagger
 * /application/{role}:
 *  get:
 *    summary: Get the list of pending applicants by role name
 *    description: Provides a JSON array of applications (as objects) where 'approved' key is falsy
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: role name
 *        schema:
 *          type: string
 *        description: A request parameter that accepts 'mentor' or 'mentee'
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
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// get pending application tickets by role

router.get('/:role', authRequired, adminRequired, (req, res) => {
  if (req.params.role === 'mentor') {
    res.json([
      {
        profile_id: '00u13omswyZM1xVya4x7',
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
        profile_id: '00u13oned0U8XP8Mb4x7',
        first_name: 'User',
        last_name: '8',
        role_name: 'mentee',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 2,
      },
      {
        profile_id: '10',
        first_name: 'User',
        last_name: '10',
        role_name: 'mentee',
        created_at: '2022-03-11T22:34:47.794Z',
        application_id: 6,
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
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// get application by profile id

router.get('/profileId/:id', checkApplicationExists, checkRole, (req, res) => {
  res.status(200).json(req.intakeData);
});

/**
 * @swagger
 * /application/{new/:role}:
 *  post:
 *    summary: Adds a new profile to the database. Stores intake data. Creates application ticket.
 *    description: Post a new object to the profiles table using input from signup(intake) data. A temporary ID is generated and attached to the profile_id of this object and should be replaced at a later date with an okta ID if/when applicant is accepted and their profile is registered. Middleware handles storage of intake data and makes use of the temporary profile_id as well (so this should be updated in parallel with profiles profile_id). Finally, an application_ticket is created for the signee which has an 'approved' key set to false by default. Note - should caching of mentor/mentee intake data fail, the newly created profile will have to be deleted in order to re-do this process. Having three operations built into one endpoint is dangerous.. but it works.
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
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

// create a new user profile and application ticket
//this only works for the mentor application because we are passing the mentorApplicationSchema directly (6/4/2022)
router.post(
  '/new/:role',
  validation(),
  createProfile,
  cacheSignUpData,
  sendData,
  (req, res, next) => {
    //this applicationTicket object works for the existing backend db schema for "tickets". Both likely need to be updated (6/4/2022)
    const applicationTicket = {
      ticket_status: 'pending',
      //unsure of correct value for 'ticket_type' to indicate this is an application (6/4/2022)
      ticket_type: 1,
      ticket_subject: 'application',
      requested_for: req.body.profile_id,
      submitted_by: req.body.profile_id,
    };
    Application.add(applicationTicket)
      .then(() => {
        res.status(201).json({ message: 'Application has been submitted' });
      })
      .catch(next);
  }
);

/**
 * @swagger
 * /application/{approve/:id}:
 *  put:
 *    summary: Registers profile with okta, updates application ticket "approved" to true, returns a temporary password
 *    description: If a pending application with this profile ID exists, middlware will fetch that profile from the database. This object is passed along into registerOktaUser where its shaped and sent to Oktas API using their clients createUser method.
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: profile id
 *        schema:
 *          type: string
 *        description: Profile ID of pending applicant
 *    responses:
 *      '200':
 *        description: Response from successful put
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tempPassword:
 *                  description: temporary password for admins to give to approved users
 *                  type: string
 *              items:
 *                $ref: '#/components/schemas/Application'
 *              example:
 *                message: "3sdfi324"
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// registers a user with okta and approves their application ticket

router.put(
  '/approve/:id',
  authRequired,
  adminRequired,
  checkApplicationExists,
  findProfile,
  registerOktaUser,
  (req, res, next) => {
    const application_id = req.application.application_id;

    Application.updateTicket(application_id, { approved: true })
      .then(() => {
        res.status(200).json({
          tempPassword: req.tempPassword,
        });
      })
      .catch(next);
  }
);

/**
 * @swagger
 * /application/{update-notes/:id}:
 *  put:
 *    summary: Updates application_notes field using the application id
 *    description: An application_notes field is updated when application_id and changes, from the req.body, are sent to the updateApplicationNotes function in the applicationModel. The updated note is returned on a successful update or a 404 if the application does not exist. The authRequired and adminRequired middleware functions keep this endpoint secure.
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: application id
 *        schema:
 *          type: string
 *        description: Application ID of pending applicant
 *    responses:
 *      '200':
 *        description: Response from successful put
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                application_notes:
 *                  description: Status of the request as a message
 *                  type: string
 *              items:
 *                $ref: '#/components/schemas/Application'
 *              example:
 *                application_notes: 'Example of the application_notes'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// updates applicants application_notes field

router.put(
  '/update-notes/:id',
  authRequired,
  adminRequired,
  (req, res, next) => {
    const application_id = req.params.id;
    const application_notes = req.body.application_notes;
    Application.updateApplicationNotes(application_id, application_notes)
      .then((response) => {
        if (response == 0)
          return next({ message: 'Application does not exist', status: 404 });

        res.status(200).json(response[0]);
      })
      .catch(next);
  }
);

/**
 * @swagger
 * /application/intake/:role/:id}:
 *  put:
 *    summary: Gets mentor or mentee intake data using role and id
 *    description: Mentor or mentee intake data is retrieved through a get request, where role and profile_id are sent as params. The mentor or mentee correlating with the profile_id will be returned on a successful get or a 404 if the profile does not exist. The authRequired and adminRequired middleware functions keep this endpoint secure.
 *    tags:
 *      - application
 *    security:
 *      - okta: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: role / profile id
 *        schema:
 *          type: string
 *        description: Profile ID of pending applicant and role (Mentors or Mentees)
 *    responses:
 *      '200':
 *        description: Response from successful get
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  description: Result of request as object
 *                  type: object
 *              items:
 *                $ref: '#/components/schemas/Application'
 *              example:
 *                message: {"result": [{"profile_id": "4F177Y8xr4Ap1q0y","first_name": "Raiden","last_name": "Nelson","email": "fake@email.com","city": "Ashland","state": "Oregon","country": "USA",
"formerly_incarcerated": true,"underrepresented_group": true,"low_income": true,"list_convictions": ["Infraction"],"subject": "General Programming","experience_level": "Expert","job_help": false,"industry_knowledge": false,"pair_programming": false,"other_info": "Notes"}]} 
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// gets mentor or mentee application intake data from Data Science

router.get(
  '/intake/:role/:id',
  authRequired,
  adminRequired,
  (req, res, next) => {
    const profile_id = req.params.id;
    const role = req.params.role;
    axios
      .post(`${baseURL}/${role}/read`, { profile_id: profile_id })
      .then((res) => {
        if (res.data.result.length === 0)
          return next({ message: 'Profile does not exist', status: 404 });

        next({ status: res.status, message: res.data });
      })
      .catch((err) => {
        next({ status: res.status, message: err });
      });
  }
);

// gets mentee Subject by mentee's ID
router.get('/subject/:id', authRequired, (req, res, next) => {
  const menteeId = req.params.id;
  Application.getMenteeSubject(menteeId)
    .then((subject) => {
      res.status(200).json(subject);
    })
    .catch(next);
});

module.exports = router;
