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
 *        submitted_by: "9"
 *        subject_id: "7"
 *        requested_role: 1
 *        approved_by: "5"
 *        comments: This is a comment
 *        pending: true
 *        resolved: false
 *        created_at: 2022-01-28T16:07:34.344Z
 *        updated_at: 2022-01-28T16:07:34.344Z
 */

// Responds with all available role ticket requests
router.get('/', authRequired, adminRequired, (req, res, next) => {
  RoleTickets.findAllRoleTickets()
    .then((roleTickets) => {
      res.status(200).json(roleTickets);
    })
    .catch((err) => {
      next(err);
    });
});

router.get(
  '/:role_ticket_id',
  authRequired,
  adminRequired,
  checkRoleTicketIdExists,
  (req, res, next) => {
    const id = req.params.role_ticket_id;
    RoleTickets.findByRoleTicketById(id)
      .then((roleTicket) => {
        res.status(200).json(roleTicket);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.post(
  '/',
  authRequired,
  adminRequired,
  validateRoleTicket,
  async (req, res, next) => {
    try {
      const roleTicketInput = req.roleTicket;
      const postResponse = await RoleTickets.Create(roleTicketInput);
      return res.status(201).json({
        message: 'new role ticket created, successfully!',
        roleTicket: postResponse,
      });
    } catch (err) {
      return next(err);
    }
  }
);

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
      return next(err);
    }
  }
);

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
      return next(err);
    }
  }
);

module.exports = router;
