const express = require('express');
const router = express.Router();

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  checkTicketExists,
  checkTicketType,
  validateTicket,
} = require('../middleware/ticketsMiddleware');
const Tickets = require('./ticketsModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Tickets:
 *      type: object
 *      required:
 *        - ticket_type
 *        - ticket_subject
 *        - submitted_by
 *      properties:
 *        ticket_id:
 *          type: integer
 *          description: Unique primary key referencing the ticket's numeric ID
 *        ticket_type:
 *          type: integer
 *          description: Foreign key referencing a numeric ticket type ID referencing the ticket type
 *        ticket_status:
 *          type: string
 *          description: Status of whether or not a ticket has been approved. Defaults to pending
 *        ticket_subject:
 *          type: string
 *          description: Subject of the ticket
 *        requested_for:
 *          type: integer
 *          description: Foreign key referencing the applicant's profile ID
 *        submitted_by:
 *          type: integer
 *          description: Foreign key referencing the applicant's profile ID
 *        approved_by:
 *          type: integer
 *          description: Foreign key referencing the applicant's profile ID
 *        urgent:
 *          type: boolean
 *          description: Status of whether or not an application is urgent or not - defaults to false
 *        notes:
 *          type: string
 *          description: Additional notes related to a ticket
 *        requested_role:
 *          type: integer
 *          description: Foreign key referencing the applicant's role
 *        created_at:
 *          type: timestamp
 *          description: Record of an application's creation time
 *      example:
 *          ticket_id: 1
 *          ticket_type: "action"
 *          ticket_status: "pending"
 *          ticket_subject: "Spencer missed his 2nd weekly session, may be dropped?"
 *          request_for: "10"
 *          submitted_by: "7"
 *          first_name: "User"
 *          last_name: "11"
 *          urgent: false
 *          notes: null
 *          requested_role: null
 *          created_at: "2022-03-28T22:12:23.940Z"
 */

/**
 * @swagger
 * /tickets:
 *  get:
 *   summary: Get the list of all pending tickets
 *   description: Provides a JSON array of tickets (as objects) where 'ticket_status' key is 'pending'
 *   tags:
 *    - tickets
 *   security:
 *    - okta: [authRequired,adminRequired]
 *   responses:
 *     '200':
 *       description: An array of tickets objects
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Tickets'
 *             example:
 *               ticket_id: 1
 *               ticket_type: "action"
 *               ticket_status: "pending"
 *               ticket_subject: "Spencer missed his 2nd weekly session, may be dropped?"
 *               request_for: "10"
 *               submitted_by: "7"
 *               first_name: "User"
 *               last_name: "11"
 *               urgent: false
 *               notes: null
 *               requested_role: null
 *               created_at: "2022-03-28T22:12:23.940Z"
 *     '401':
 *       $ref: '#/components/responses/UnauthorizedError'
 */

//get tickets by ticket_status equal to "pending"

router.get('/', authRequired, adminRequired, (req, res, next) => {
  Tickets.getPendingTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(next);
});
/**
 * @swagger
 * components:
 *  parameters:
 *    submitted_by:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      description: submitted_by profile ID to return
 *      required: true
 *
 * /tickets/profile/{id}:
 *  get:
 *   summary: Get the list of pending tickets by submitted_by ID
 *   description: Provides a JSON array of tickets (as objects) where ticket_status is 'pending'
 *   tags:
 *     - tickets
 *   security:
 *     - okta: []
 *   parameters:
 *     - $ref: '#/components/parameters/submitted_by'
 *   responses:
 *     '200':
 *       description: An array of tickets objects
 *       content:
 *         tickets/json:
 *           schema:
 *             $ref: '#/components/schemas/Tickets'
 *     '401':
 *       $ref: '#/components/responses/UnauthorizedError'
 *     '404':
 *       $ref: '#/components/responses/NotFound'
 */

//get tickets by submitted_by profile ID

router.get('/profile/:id', checkTicketExists, authRequired, (req, res) => {
  res.status(200).json(req.ticket);
});

/**
 * @swagger
 * components:
 *  parameters:
 *    ticket_type:
 *      in: path
 *      name: ticket_type
 *      schema:
 *        type: string
 *      description: ticket type to return
 *      required: true
 *
 * /tickets/{ticket_type}:
 *  get:
 *   summary: Get the list of tickets by certain ticket type
 *   description: Provides a JSON array of tickets (as objects) according to a certain ticket_type
 *   tags:
 *     - tickets
 *   security:
 *     - okta: []
 *   parameters:
 *     - $ref: '#/components/parameters/ticket_type'
 *   responses:
 *     '200':
 *       description: An array of tickets objects
 *       content:
 *         tickets/json:
 *           schema:
 *             $ref: '#/components/schemas/Tickets'
 *           example:
 *             ticket_id: 2
 *             ticket_type: application
 *             ticket_status: approved
 *             ticket_subject: Application for mentee
 *             requested_for: null
 *             first_name: "User"
 *             last_name: "11"
 *             urgent: false
 *             notes: null
 *             requested_role: 4
 *             created_at: 2022-03-28T22:12:23.940Z
 *             updated_at: 2022-03-28T22:12:23.940Z
 *     '401':
 *       $ref: '#/components/responses/UnauthorizedError'
 *     '404':
 *       $ref: '#/components/responses/NotFound'
 */

//get tickets by ticket_type

router.get('/:ticket_type', checkTicketType, authRequired, (req, res) => {
  res.status(200).json(req.tickets);
});

//Post new ticket

router.post('/', validateTicket, authRequired, (req, res, next) => {
  Tickets.add(req.body)
    .then(() => {
      res.status(201).json({ message: 'Ticket has been submitted' });
    })
    .catch(next);
});

//PUT endpoint to update ticket status by ticket ID

router.put('/:id', authRequired, checkTicketExists, (req, res, next) => {
  const { id } = req.params;
  const { ticket_status } = req.body;
  Tickets.updateTicketStatus(id, ticket_status)
    .then(() => {
      res.status(200).json({
        message: `Ticket status updated for Ticket with ${id}`,
      });
    })
    .catch(next);
});

//PUT endpoint to update notes by ticket ID

router.put('/notes/:id', authRequired, checkTicketExists, (req, res, next) => {
  const { id } = req.params;
  const { notes } = req.body;
  Tickets.updateNotes(id, notes)
    .then(() => {
      res.status(200).json({ message: `Notes have been successfully updated` });
    })
    .catch(next);
});

//Delete endpoint to remove the ticket

router.delete('/:id', authRequired, checkTicketExists, (req, res, next) => {
  const { id } = req.params;
  Tickets.remove(id)
    .then(() => {
      res.status(200).json({
        message: `Ticket with ID ${id} have been successfully removed`,
      });
    })
    .catch(next);
});

module.exports = router;
