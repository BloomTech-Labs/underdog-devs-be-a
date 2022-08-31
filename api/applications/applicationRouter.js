const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const router = express.Router();
// const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  cacheSignUpData,
  sendData,
} = require('../middleware/applicationMiddleware');
const { createProfile } = require('../middleware/profilesMiddleware');
const { readAllUsers } = require('../middleware/userDBMiddleware');
const validation = require('../helpers/validation');
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

/**
 * @swagger
 * components:
 *  schemas:
 *    Mentor example:
 *      {
      "profile_id": "805ff5x334yBv7Og",
      "first_name": "Zavier",
      "last_name": "Bailey",
      "email": "Zavier.Bailey@gmail.com",
      "country": "U.S.",
      "state": "New Mexico",
      "city": "New Town",
      "current_company": "Uber",
      "current_position": "Data Scientist",
      "tech_stack": [
        "iOS"
      ],
      "commitment": true,
      "job_help": true,
      "industry_knowledge": true,
      "pair_programming": true,
      "referred_by": "Family",
      "other_info": "anything else may be written here",
      "validate_status": "pending",
      "is_active": true,
      "accepting_new_mentees": true,
      "created_at": "2022-08-26T15:15:48.109000"
    }

    Mentee example:
      {
      "profile_id": "j0346WB7lMj10kk8",
      "first_name": "Nathan",
      "last_name": "Gomez",
      "email": "Nathan.Gomez@gmail.com",
      "country": "U.S.",
      "state": "of Columbia",
      "city": "Washington",
      "formerly_incarcerated": true,
      "underrepresented_group": false,
      "low_income": true,
      "convictions": "Felony, Misdemeanor",
      "tech_stack": "Design UI/UX",
      "job_help": false,
      "pair_programming": false,
      "referred_by": "Friend",
      "other_info": "anything else may be written here",
      "validate_status": "approved",
      "is_active": true,
      "in_project_underdog": false,
      "created_at": "2022-08-26T15:15:42.401000",
      "updated_at": "2022-08-29T17:45:42.331000"
    }


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
router.post('/', readAllUsers, (req, res) => {
  const users = req.info;
  res.status(200).json({ users });
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
 * /application/{update-validate_status/:id}:
 *  put:
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
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'

NOTE: FE discerns if the user is a mentor/mentee and sends back the appropriate shape: 
mentor = {validate_status & current_company }
mentee = {validate_status}
this endpoint can then send the validate status to the appropriate endpoint depending on whether the current_company is present or not
  
authRequired, and AdminRequired imports have been left (commented out) because they will likely be needed when auth0 is implemented.

*/
router.post('/update-validate_status/:profile_id', (req, res, next) => {
  const isMentor = req.body.current_company;
  const { profile_id } = req.params;

  if (isMentor) {
    axios
      .post(`${baseURL}/update/mentor/${profile_id}`, {
        validate_status: req.body.validate_status,
      })
      .then((result) => {
        res.send({ status: result.status, message: result.data });
      })
      .catch((err) => {
        next({ status: res.status, message: err });
      });
  } else {
    axios
      .post(`${baseURL}/update/mentee/${profile_id}`, {
        validate_status: req.body.validate_status,
      })
      .then((result) => {
        res.send({ status: result.status, message: result.data });
      })
      .catch((err) => {
        next({ status: res.status, message: err });
      });
  }
});

module.exports = router;
