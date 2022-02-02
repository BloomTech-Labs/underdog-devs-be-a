const express = require('express');
const router = express.Router();
const Actions = require('./actionsModel');
const { validateSubjectBody } = require('./actionsMiddleware');
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
 *      - okta: []
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
router.get('/', function (req, res) {
  Actions.findAll()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  Actions.findById(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/', validateSubjectBody, (req, res, next) => {
  const action = req.body;
  Actions.create(action)
    .then(() => {
      res.status(201).json({ message: 'success', action });
    })
    .catch(next);
});

router.put('/:id', validateSubjectBody, (req, res) => {
  const changes = req.body;
  if (changes) {
    const id = req.params.id;
    Actions.findById(id)
      .then(
        Actions.update(id, changes)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'ticket updated', changes: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: "couldn't update ticket",
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: 'could not find ticket',
          error: err.message,
        });
      });
  }
});

module.exports = router;
