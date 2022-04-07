const express = require('express');
const router = express.Router();

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  checkTicketExists,
  checkTicketByID,
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
 *         application/json:
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
 *         application/json:
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

/**
 * @swagger
 * required: true
 * /tickets:
 *  post:
 *    summary: Adds a new ticket to the database
 *    description: Posts a new ticket object to the the tickets table, if the ticket is validly formatted.
 *    tags:
 *      - tickets
 *    security:
 *      - okta: []
 *    requestBody:
 *      description: Information about the ticket to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tickets'
 *          example:
 *            ticket_type: "action"
 *            ticket_status: "pending"
 *            ticket_subject: "Spencer missed his 2nd weekly session, may be dropped?"
 *            request_for: "10"
 *            submitted_by: "7"
 *            first_name: "User"
 *            last_name: "11"
 *            urgent: false
 *            notes: null
 *            requested_role: null
 *      required:
 *        - ticket_type
 *        - ticket_subject
 *        - submitted_by
 *    responses:
 *      '200':
 *        description: Response from successful post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ticket:
 *                  description: Object mirroring the newly created action
 *                  type: object
 *              example:
 *                message: Ticket has been submitted
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '406':
 *        description: Not acceptable ticket request body
 */
//Post new ticket

router.post('/', validateTicket, authRequired, (req, res, next) => {
  Tickets.add(req.body)
    .then(() => {
      res.status(201).json({ message: 'Ticket has been submitted' });
    })
    .catch(next);
});

/**
 * @swagger
 * /tickets/{ticket_id}:
 *  put:
 *    summary: Updates the ticket status
 *    description: Allows the user to update the ticket status of a specific ticket with ticket_ID
 *    tags:
 *      - tickets
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: ticket_id
 *        schema:
 *          type: interger
 *        description: ID of the ticket to return
 *    requestBody:
 *      description: Information to update about the desired role ticket
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tickets'
 *          example:
 *            ticket_status: "approved"
 *      required: true
 *    responses:
 *      '200':
 *        description: A success message indicating that the ticket has been updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message, including the ID of the updated ticket
 *            example:
 *             message: 'Ticket status updated for Ticket with ${id}'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 */

//PUT endpoint to update ticket status by ticket ID

router.put('/:id', authRequired, checkTicketByID, (req, res, next) => {
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

/**
 * @swagger
 * /tickets/notes/{ticket_id}:
 *  put:
 *    summary: Updates the ticket notes
 *    description: Allows the user to update the notes of a specific ticket with ticket_ID
 *    tags:
 *      - tickets
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: ticket_id
 *        schema:
 *          type: interger
 *        description: ID of the ticket to return
 *    requestBody:
 *      description: Information to update about the desired ticket notes
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tickets'
 *          example:
 *            notes: "Update the notes"
 *      required: true
 *    responses:
 *      '200':
 *        description: A success message indicating that the ticket notes have been updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *            example:
 *             message: 'Notes have been successfully updated'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 */

//PUT endpoint to update notes by ticket ID

router.put('/notes/:id', authRequired, checkTicketByID, (req, res, next) => {
  const { id } = req.params;
  const { notes } = req.body;
  Tickets.updateNotes(id, notes)
    .then(() => {
      res.status(200).json({ message: `Notes have been successfully updated` });
    })
    .catch(next);
});

/**
 * @swagger
 * /tickets/{ticket_id}:
 *  delete:
 *    summary: Deletes the ticket with provided ID from the database
 *    description: Allows the user to delete a specific ticket with ticket_ID
 *    tags:
 *      - tickets
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: ticket_id
 *        schema:
 *          type: interger
 *        description: ID of the ticket to remove from database
 *    responses:
 *      '200':
 *        description: A success message indicating that the ticket notes have been deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message indicating the ID of the ticket removed
 *            example:
 *             message: 'Ticket with ID ${ticket_id} have been successfully removed'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        $ref: '#/components/responses/NotFound'
 */

//Delete endpoint to remove the ticket

router.delete('/:id', authRequired, checkTicketByID, (req, res, next) => {
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
