const express = require('express');
const Ticket = require('./resourceTicketsModel');
const router = express.Router();
const jwt = require('jwt-decode');
const authRequired = require('../middleware/authRequired');

//get all Resource tickets

router.get('/', authRequired, (req, res) => {
  Ticket.findAll()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get a resource_ticket by its id

router.get('/:resource_ticket', authRequired, (req, res) => {
  const id = req.params.resource_ticket;
  Ticket.findByTicketId(id)
    .then((ticket) => {
      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ error: 'Resource Ticket not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//create a resource ticket, current user logged in, needs MW , make sure there is a message in req.body

router.post('/', authRequired, (req, res, next) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  const ticket = req.body;
  Ticket.Create(User.sub, ticket)
    .then(() => {
      res.status(201).json({ message: 'success', ticket });
    })
    .catch(next);
});

// update a resource ticket

router.put('/:resource_ticket', authRequired, (req, res, next) => {
  const id = req.params.resource_ticket;
  const changes = req.body;
  Ticket.Update(id, changes)
    .then((change) => {
      if (change) {
        Ticket.findByTicketId(id).then((success) => {
          res.status(200).json({
            message: `Resource Ticket '${success.resource_ticket_id}' updated`,
            success,
          });
        });
      }
    })
    .catch(next);
});

// Delete a resource ticket

router.delete('/:meeting_id', authRequired, (req, res, next) => {
  const id = req.params.meeting_id;
  Ticket.Delete(id)
    .then((ticket) => {
      if (ticket) {
        res.status(200).json({
          message: 'ticket deleted',
        });
      }
    })
    .catch(next);
});

module.exports = router;
