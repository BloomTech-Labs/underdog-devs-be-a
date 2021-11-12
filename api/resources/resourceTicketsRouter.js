const express = require('express');
const Ticket = require('./resourceTicketsModel');
const router = express.Router();
// const jwt = require('jwt-decode');
// const authRequired = require('../middleware/authRequired');

router.get('/', (req, res) => {
  Ticket.findAll()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
