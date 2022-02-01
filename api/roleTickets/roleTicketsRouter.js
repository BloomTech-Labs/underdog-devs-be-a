const express = require('express');
const router = express.Router();
const RoleTickets = require('./roleTicketsModel');

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');
const {
  checkRoleTicketIdExists,
  validateRoleTicket,
} = require('../middleware/roleTicketsMiddleware');

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
        resource: postResponse,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
