const express = require('express');
const Ticket = require('./resourceTicketsModel');
const router = express.Router();
const jwt = require('jwt-decode');
const authRequired = require('../middleware/authRequired');
const {
  mentorRequired,
  adminRequired,
} = require('../middleware/permissionsRequired');

//get all Resource tickets

const dummyData = [
  {
    resource_ticket_id: 1,
    created_at: '2022-03-11T22:34:47.809Z',
    updated_at: '2022-03-11T22:34:47.809Z',
    submitted_by: '7',
    pertains_to: 'Elon Musk',
    message:
      'Elon deserves to have the 2020 macbook pro. Of all the mentees I have, I think he has the most potential.',
  },
  {
    resource_ticket_id: 2,
    created_at: '2022-03-11T22:34:47.809Z',
    updated_at: '2022-03-11T22:34:47.809Z',
    submitted_by: '9',
    pertains_to: null,
    message: 'Foo needs the Computer Monitor, because he has bad eyesight.',
  },
];

router.get('/', authRequired, adminRequired, (req, res) => {
  res.status(200).json(dummyData);
});

//get all the tickets the current user has

router.get('/mytickets', authRequired, mentorRequired, async (req, res) => {
  const token = req.headers.authorization;
  const user = jwt(token);
  const id = user.sub;
  await Ticket.getByProfileId(id)
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get a resource_ticket by its id

router.get(
  '/:resource_ticket_id',
  authRequired,
  adminRequired,
  validRecTicketID,
  (req, res) => {
    const id = req.params.resource_ticket_id;
    Ticket.findByTicketId(id)
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
);

//create a resource ticket, current user logged in

router.post(
  '/',
  authRequired,
  mentorRequired,
  validNewTicket,
  (req, res, next) => {
    const token = req.headers.authorization;
    const User = jwt(token);
    const ticket = req.body;
    Ticket.Create(User.sub, ticket)
      .then(() => {
        res.status(201).json({ message: 'success', ticket });
      })
      .catch(next);
  }
);

// update a resource ticket

router.put(
  '/:resource_ticket_id',
  authRequired,
  mentorRequired,
  validNewTicket,
  (req, res, next) => {
    const id = req.params.resource_ticket_id;
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
  }
);

// Delete a resource ticket

router.delete(
  '/:resource_ticket_id',
  authRequired,
  mentorRequired,
  (req, res, next) => {
    const id = req.params.resource_ticket_id;
    Ticket.Delete(id)
      .then((ticket) => {
        if (ticket) {
          res.status(200).json({
            message: 'ticket deleted',
          });
        }
      })
      .catch(next);
  }
);

///////////////////////////MIDDLEWARE///////////////////////////////

// validate the ticket id exists in the database

function validRecTicketID(req, res, next) {
  Ticket.findByTicketId(req.params.resource_ticket_id).then(
    (resourceTicket) => {
      if (resourceTicket) {
        req.resourceTicket = resourceTicket;
        next();
      } else {
        res.status(400).json({
          message: 'resource_ticket_id Not Found',
        });
      }
    }
  );
}

// validate the req.body when creating or updating a new ticket

function validNewTicket(req, res, next) {
  const ticket = req.body;
  if (!ticket) {
    res.status(400).json({
      message: 'missing resource ticket Data',
    });
  } else if (!ticket.message) {
    res.status(400).json({
      message: 'missing message field',
    });
  } else {
    next();
  }
}

module.exports = router;
