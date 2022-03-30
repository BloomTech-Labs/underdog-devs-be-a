const express = require('express');
const router = express.Router();

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired.js');
const { checkTicketExists } = require('../middleware/ticketsMiddleware');
const Tickets = require('./ticketsModel');

router.get('/', authRequired, adminRequired, (req, res, next) => {
  Tickets.getPendingTickets()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(next);
});

router.get('/:id', checkTicketExists, (req, res) => {
  res.status(200).json(req.ticket);
});
module.exports = router;
