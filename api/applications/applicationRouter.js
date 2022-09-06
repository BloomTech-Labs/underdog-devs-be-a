const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const router = express.Router();
// const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  cacheSignUpData,
  sendData,
  validateStatusRequest,
} = require('../middleware/applicationMiddleware');
const { getAllApplications } = require('./applicationModel');
const { createProfile } = require('../middleware/profilesMiddleware');
const validation = require('../helpers/validation');
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

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

// router.post('/', readAllUsers, (req, res) => {
//   const users = req.info;
//   res.status(200).json({ users });
// });

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
 * /application/{update-validate_status/:id}:
 *  post:
 *    summary: Updates validate_status of a given user
 *    description: user is fetched from MongoDB by the profile_id in req.params, and is modified by the validate_status selected by the user (approved/rejected)
 *    tags:
 *      - application
 *    security:
 *      - auth0: [authRequired, adminRequired]
 *    parameters:
 *      - in: param
 *        name: profile id
 *    responses:
 *      '200':
 *        description: Response from successful post to MongoDB
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: 200
 *                message: {
 *                  result: true
 *                    }
 *      '422': valid strings for the validate_status include:'pending', 'approved', 'rejected'.
 */
/*
NOTE: FE discerns if the user is a mentor/mentee and sends back the appropriate shape: 
mentor = {validate_status & current_company }
mentee = {validate_status}
this endpoint can then send the validate status to the appropriate endpoint depending on whether the current_company is present or not
  
authRequired, and AdminRequired imports have been left (commented out) because they will likely be needed when auth0 is implemented.
*/
router.post(
  '/update-validate_status/:profile_id',
  validateStatusRequest,
  (req, res, next) => {
    const isMentor = req.body.current_company;
    const { profile_id } = req.params;

    const role = isMentor ? 'mentor' : 'mentee';

    axios
      .post(`${baseURL}/update/${role}/${profile_id}`, {
        validate_status: req.body.validate_status,
      })
      .then((result) => {
        res.send({ status: result.status, message: result.data });
      })
      .catch((err) => {
        next({ status: err.status, message: err.message });
      });
  }
);

module.exports = router;
