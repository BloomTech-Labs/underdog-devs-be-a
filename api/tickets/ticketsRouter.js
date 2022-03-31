const express = require('express');
const router = express.Router();

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired.js');
const {
  checkTicketExists,
  checkTicketType,
} = require('../middleware/ticketsMiddleware');
const Tickets = require('./ticketsModel');

router.get('/', authRequired, adminRequired, (req, res, next) => {
  Tickets.getPendingTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(next);
});

router.get('/profile_id/:id', checkTicketExists, authRequired, (req, res) => {
  res.status(200).json(req.ticket);
});

router.get('/:ticket_type', checkTicketType, authRequired, (req, res) => {
  res.status(200).json(req.tickets);
});

module.exports = router;
