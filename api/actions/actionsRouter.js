const express = require('express');
const router = express.Router();
const Actions = require('./actionsModel');
const {
  validateSubjectBody,
  checkActionTicketExists,
} = require('./actionsMiddleware');
/**
 * @swagger
 * components:
 *  schemas:
 *    Action:
 *      type: object
 *      required:
 *        - submitted_by
 *        - subject_id
 *        - issue
 *      properties:
 *        action_ticket_id:
 *          type: integer
 *          description: Unique primary key referencing an action ticket
 *        submitted_by:
 *          type: integer
 *          description: Unique primary key referencing a profile's auto-assigned ID of the user who submitted action
 *        subject_id:
 *          type: integer
 *          description: Unique primary key referencing a profile's auto-assigned ID of the subject of the action
 *        issue:
 *          type: string
 *          description: A string describing issue at hand
 *        comments:
 *          type: string
 *          description: Any additional comments
 *        pending:
 *          type: boolean
 *          description: Pending case set to true from start
 *        resolved:
 *          type: boolean
 *          description: Resolved case set to false from start
 *        strike:
 *          type: boolean
 *          description: Need more clarification on this will update soon
 *        created_at:
 *          type: timestamp
 *          description: Automatic date-time string from a action's creation in the database
 *        updated_at:
 *          type: timestamp
 *          description: Automatic date-time string from a action's last update in the database
 *      example:
 *        action_ticket_id: 1
 *        submitted_by: 7
 *        subject_id: 10
 *        issue: "Spencer missed his 2nd weekly session, may be dropped?"
 *        comments: null
 *        pending: true
 *        resolved: false
 *        strike: true
 *        created_at: "2022-01-26 15:33:34.945832-07"
 *        updated_at: "2022-01-26 15:33:34.945832-07"
 */

/**
 * @swagger
 * /actions:
 *  get:
 *    summary: Get the list of all action tickets
 *    description: Provides a JSON array of action tickets (as objects)
 *    tags:
 *      - action
 *    security:
 *      - auth0: []
 *    responses:
 *      '200':
 *        description: An array of action objects
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Actions'
 *              example:
 *                - action_ticket_id: 1
 *                  submitted_by: 7
 *                  subject_id: 10
 *                  issue: "Spencer missed his 2nd weekly session, may be dropped?"
 *                  comments: null
 *                  pending: true
 *                  resolved: false
 *                  strike: true
 *                  created_at: "2022-01-26 15:33:34.945832-07"
 *                  updated_at: "2022-01-26 15:33:34.945832-07"
 *                - action_ticket_id: 1
 *                  submitted_by: 7
 *                  subject_id: 10
 *                  issue: "Spencer missed his 2nd weekly session, may be dropped?"
 *                  comments: null
 *                  pending: true
 *                  resolved: false
 *                  strike: true
 *                  created_at: "2022-01-26 15:33:34.945832-07"
 *                  updated_at: "2022-01-26 15:33:34.945832-07"
 *                - action_ticket_id: 1
 *                  submitted_by: 7
 *                  subject_id: 10
 *                  issue: "Spencer missed his 2nd weekly session, may be dropped?"
 *                  comments: null
 *                  pending: true
 *                  resolved: false
 *                  strike: true
 *                  created_at: "2022-01-26 15:33:34.945832-07"
 *                  updated_at: "2022-01-26 15:33:34.945832-07"
 */
const dummyData = [
  {
    action_ticket_id: 1,
    submitted_by: '7',
    subject_id: '10',
    issue: 'Spencer missed his 2nd weekly session, may be dropped?',
    comments: null,
    pending: true,
    resolved: false,
    strike: true,
    created_at: '2022-03-11T22:34:47.791Z',
    updated_at: '2022-03-11T22:34:47.791Z',
  },
  {
    action_ticket_id: 2,
    submitted_by: '11',
    subject_id: '00u13oned0U8XP8Mb4x7',
    issue:
      "My mentor isn't really helping me learn, could I seek reassignment?",
    comments: null,
    pending: true,
    resolved: false,
    strike: false,
    created_at: '2022-03-11T22:34:47.791Z',
    updated_at: '2022-03-11T22:34:47.791Z',
  },
  {
    action_ticket_id: 3,
    submitted_by: '00u13oned0U8XP8Mb4x7',
    subject_id: '11',
    issue:
      'Mentee and I have not been getting along, I suggest a reassignment for best outcome.',
    comments: null,
    pending: true,
    resolved: false,
    strike: false,
    created_at: '2022-03-11T22:34:47.791Z',
    updated_at: '2022-03-11T22:34:47.791Z',
  },
  {
    action_ticket_id: 4,
    submitted_by: '9',
    subject_id: '12',
    issue: 'Has not turned in their assignments.',
    comments: null,
    pending: true,
    resolved: false,
    strike: true,
    created_at: '2022-03-11T22:34:47.791Z',
    updated_at: '2022-03-11T22:34:47.791Z',
  },
];
router.get('/', (req, res) => {
  res.status(200).json(dummyData);
});

/**
 * @swagger
 * /actions/{action_ticket_id}:
 *  get:
 *    summary: Get details about a single action_ticket
 *    tags:
 *      - action
 *    security:
 *      - auth0: []
 *    parameters:
 *      - in: path
 *        name: action_ticket_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the action_ticket to look for.
 *    responses:
 *      '200':
 *        description: Information about a single action_ticket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Action'
 *              example:
 *                - action_ticket_id: 1
 *                  submitted_by: 7
 *                  subject_id: 10
 *                  issue: "Spencer missed his 2nd weekly session, may be dropped?"
 *                  comments: null
 *                  pending: true
 *                  resolved: false
 *                  strike: true
 *                  created_at: "2022-01-26 15:33:34.945832-07"
 *                  updated_at: "2022-01-26 15:33:34.945832-07"
 *      '400':
 *        description: Bad Request, Action with that Id does not exist
 */
router.get('/:id', checkActionTicketExists, (req, res) => {
  res.status(200).json(req.action);
});

/**
 * @swagger
 * /actions:
 *  post:
 *    summary: Adds a new action to the database
 *    description: Posts a new action object to the action_tickets table, if the action is validly formatted. You only need to include submitted_by, subject_id, and the issue in the request body. Comments are optional. Only data provided in the request body will be reflected in the response body.
 *    tags:
 *      - action
 *    security:
 *      - auth0: []
 *    requestBody:
 *      description: Information about the action to be posted
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Action'
 *      required: true
 *    responses:
 *      '200':
 *        description: Response from successful post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                action:
 *                  description: Object mirroring the newly created action
 *                  type: object
 *              example:
 *                action:
 *                  submitted_by: 7
 *                  subject_id: 10
 *                  issue: "Spencer missed his 2nd weekly session, may be dropped?"
 */

router.post('/', validateSubjectBody, (req, res, next) => {
  const action = req.body;
  Actions.create(action)
    .then((newAction) => {
      res.status(201).json(newAction[0]);
    })
    .catch(next);
});
/**
 * @swagger
 * /actions/{action_ticket_id}:
 *  put:
 *    summary: Updates actions details
 *    description: Allows you to edit information about a action. Requires submitted_by, subject_id, and the issue.
 *    tags:
 *      - action
 *    security:
 *      - auth0: []
 *    parameters:
 *      - in: path
 *        name: action_ticket_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the action to edit
 *    requestBody:
 *      description: Information to update about the desired resource
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Action'
 *      required: true
 *    responses:
 *      '200':
 *        description: Response from a successful action update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message, including the ID of the updated action
 *                success:
 *                  type: object
 *                  description: Object containing all information pertaining to the newly updated resource
 *              example:
 *                  "action_ticket_id": 1
 *                  "submitted_by": "7"
 *                  "subject_id": "10"
 *                  "issue": "Spencer missed his 2nd weekly session, may be dropped? maybe"
 *                  "comments": null
 *                  "pending": true
 *                  "resolved": false
 *                  "strike": true
 *                  "created_at": "2022-01-26T22:33:34.945Z"
 *                  "updated_at": "2022-01-26T22:33:34.945Z"
 */

router.put(
  '/:id',
  validateSubjectBody,
  checkActionTicketExists,
  (req, res, next) => {
    const changes = req.body;
    const id = req.params.id;

    Actions.update(id, changes)
      .then((updated) => {
        res.status(200).json(updated[0]);
      })
      .catch(next);
  }
);

module.exports = router;
