const express = require('express');
const router = express.Router();
const RoleTickets = require('./roleTicketsModel');

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');
const {
  checkRoleTicketIdExists,
  validateRoleTicket,
} = require('../middleware/roleTicketsMiddleware');

/**
 * @swagger
 * components:
 *  schemas:
 *    Role Ticket:
 *      type: object
 *      required:
 *        - submitted_by
 *        - subject_id
 *        - requested_role
 *      properties:
 *        role_ticket_id:
 *          type: integer
 *          description: Unique primary key referencing a role ticket's auto-assigned ID - must not be provided in request bodies
 *        submitted_by:
 *          type: string
 *          description: Foreign key referencing the profile_id of the submitter
 *        subject_id:
 *          type: string
 *          description: Foreign key referencing the profile_id of the profile whose role will be changed
 *        requested_role:
 *          type: integer
 *          description: Foreign key referencing the requested role_id
 *        approved_by:
 *          type: string
 *          description: Foreign key referencing the profile_id of the approving profile
 *        comments:
 *          type: string
 *          description: Comments about the role ticket
 *        pending:
 *          type: boolean
 *          description: State of whether or not a ticket is pending - defaults to true
 *        resolved:
 *          type: boolean
 *          description: State of whether or not a ticket is resolved or not - defaults to false
 *        created_at:
 *          type: timestamp
 *          description: Automatic date-time string from a ticket's creation in the database - must not be provided in request bodies
 *        updated_at:
 *          type: timestamp
 *          description: Automatic date-time string from a ticket's last update in the database - must not be provided in request bodies
 *
 *      example:
 *        role_ticket_id: 1
 *        submitted_by: "00uhjfrwdWAQvD8JV4x6"
 *        subject_id: "00uhjfrwdWAQvD8JV4x7"
 *        requested_role: 1
 *        approved_by: "00uhjfrwdWAQvD8JV4x8"
 *        comments: This is a comment
 *        pending: true
 *        resolved: false
 *        created_at: "2022-01-28T16:07:34.344Z"
 *        updated_at: "2022-01-28T16:07:34.344Z"
 *
 * /role-tickets:
 *  get:
 *    description: Returns a list of all role tickets
 *    summary: Get a list of all role tickets
 *    security:
 *      - okta: []
 *    tags:
 *      - role ticket
 *    responses:
 *      200:
 *        description: array of role tickets
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Role Ticket'
 *              example:
 *                - role_ticket_id: 1
 *                  submitted_by: "00uhjfrwdWAQvD8JV4x6"
 *                  subject_id: "00uhjfrwdWAQvD8JV4x7"
 *                  requested_role: 1
 *                  approved_by: "00uhjfrwdWAQvD8JV4x8"
 *                  comments: "This is a comment"
 *                  pending: true
 *                  resolved: false
 *                  created_at: "2022-01-28T16:07:34.344Z"
 *                  updated_at: "2022-01-28T16:07:34.344Z"
 *                - role_ticket_id: 2
 *                  submitted_by: "00ulthapbErVUwVJy4x9"
 *                  subject_id: "00uhjfrwdWAQvD8JV4x8"
 *                  requested_role: 2
 *                  approved_by: "00uhjfrwdWAQvD8DV4x2"
 *                  comments: "Another comment"
 *                  pending: false
 *                  resolved: true
 *                  created_at: "2022-01-28T16:07:34.344Z"
 *                  updated_at: "2022-01-28T16:07:34.344Z"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// Responds with all available role ticket requests
router.get('/', authRequired, adminRequired, async (req, res, next) => {
  await RoleTickets.findAll()
    .then((roletickets) => {
      if (roletickets.length === 0) {
        next({ status: 200, message: 'No role tickets available' });
      } else {
        res.status(200).json(roletickets);
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

/**
 * @swagger
 * /role-tickets/{role_ticket_id}:
 *  get:
 *    summary: Get details about a single role ticket
 *    tags:
 *      - role ticket
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: role_ticket_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the role ticket to look for
 *    responses:
 *      '200':
 *        description: Information about a specific role ticket
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role Ticket'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        description: Role Ticket with the given ID could not be found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message returned by the API
 *                  example: 'Role Ticket with ID 1 not found!'
 */

router.get(
  '/:role_ticket_id',
  authRequired,
  adminRequired,
  checkRoleTicketIdExists,
  (req, res, next) => {
    try {
      const roleTicket = req.roleTicket;
      return res.status(200).json(roleTicket);
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  }
);

/**
 * @swagger
 * /role-tickets:
 *  post:
 *    summary: Adds a new role ticket to the database
 *    description: Posts a new role ticket object to the role_tickets table, if the role ticket is validly formatted. You only need to include submitted_by, subject_id, and requested_role in the request body, but other fields that adhere to the schema can be included if desired
 *    tags:
 *      - role ticket
 *    security:
 *      - okta: []
 *    requestBody:
 *      description: Information about the role ticket to be posted
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Role Ticket'
 *      required: true
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
 *                resource:
 *                  description: Object mirroring the newly created role ticket
 *                  type: object
 *              example:
 *                message: 'new role ticket created, successfully'
 *                roleTicket:
 *                  role_ticket_id: 3
 *                  submitted_by: "00uhjfrwdWAQvD8JV4x6"
 *                  subject_id: "00uhjfrwdWAQvD8JV4x7"
 *                  requested_role: 1
 *                  approved_by: "00uhjfrwdWAQvD8JV4x8"
 *                  comments: "This is a comment"
 *                  pending: true
 *                  resolved: false
 *                  created_at: "2022-01-28T16:07:34.344Z"
 *                  updated_at: "2022-01-28T16:07:34.344Z"
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.post(
  '/',
  authRequired,
  adminRequired,
  validateRoleTicket,
  async (req, res, next) => {
    try {
      const roleTicketInput = req.roleTicketInput;
      const postResponse = await RoleTickets.Create(roleTicketInput);
      return res.status(201).json({
        message: 'new role ticket created, successfully!',
        roleTicket: postResponse,
      });
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  }
);

/**
 * @swagger
 * /role-tickets/{role_ticket_id}:
 *  put:
 *    summary: Updates role ticket details
 *    description: Allows you to edit information about a role ticket. Requires submitted_by, subject_id, and requested_role fields. Only information included in the request body will be altered about the resource in question (i.e. empty fields will be ignored).
 *    tags:
 *      - role ticket
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: role_ticket_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the role ticket to edit
 *    requestBody:
 *      description: Information to update about the desired role ticket
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Role Ticket'
 *      required: true
 *    responses:
 *      '200':
 *        description: Response from a successful role ticket update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message, including the ID of the updated role ticket
 *                success:
 *                  type: object
 *                  description: Object containing all information pertaining to the newly updated role ticket
 *              example:
 *                message: "Role Ticket #108 updated, successfully!"
 *                roleTicket:
 *                  role_ticket_id: 3
 *                  submitted_by: "00uhjfrwdWAQvD8JV4x6"
 *                  subject_id: "00uhjfrwdWAQvD8JV4x7"
 *                  requested_role: 1
 *                  approved_by: "00uhjfrwdWAQvD8JV4x8"
 *                  comments: "This is a comment"
 *                  pending: true
 *                  resolved: false
 *                  created_at: "2022-01-28T16:07:34.344Z"
 *                  updated_at: "2022-01-28T16:07:34.344Z"
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        description: Role Ticket with the given ID could not be found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message returned by the API
 *                  example: 'Role Ticket with ID 1 not found!'
 */

router.put(
  '/:role_ticket_id',
  authRequired,
  adminRequired,
  checkRoleTicketIdExists,
  validateRoleTicket,
  async (req, res, next) => {
    try {
      const { role_ticket_id } = req.params;
      const roleTicketInput = req.roleTicket;
      const updatedRoleTicket = await RoleTickets.Update(
        role_ticket_id,
        roleTicketInput
      );
      return res.status(200).json({
        message: `Role ticket #${role_ticket_id} updated, succesfully!`,
        roleTicket: updatedRoleTicket,
      });
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  }
);

/**
 * @swagger
 * /role-tickets/{role_ticket_id}:
 *  delete:
 *    summary: Deletes a role ticket from the database
 *    description: If a role ticket with the ID provided as a URL parameter for this request exists, it will be deleted from the database.
 *    tags:
 *      - role ticket
 *    security:
 *      - okta: []
 *    parameters:
 *      - in: path
 *        name: role_ticket_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the role ticket to delete
 *    responses:
 *      '200':
 *        description: Successful deletion of a role ticket
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Message relaying a role ticket's successful deletion
 *              example:
 *                message: 'Role Ticket #1 deleted, successfully!'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *      '404':
 *        description: Role Ticket with the given ID could not be found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message returned by the API
 *                  example: 'Role Ticket with ID 1 not found!'
 */

router.delete(
  '/:role_ticket_id',
  authRequired,
  adminRequired,
  checkRoleTicketIdExists,
  async (req, res, next) => {
    try {
      const { role_ticket_id } = req.params;
      await RoleTickets.Delete(role_ticket_id);
      return res.status(200).json({
        message: `Role Ticket #${role_ticket_id} deleted, succesfully!`,
      });
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  }
);

module.exports = router;
