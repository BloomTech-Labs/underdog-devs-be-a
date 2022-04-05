const { findById, findByTicketType } = require('../tickets/ticketsModel');
const ticketsSchema = require('../../data/schemas/ticketsSchema');

const checkTicketExists = async (req, res, next) => {
  const id = req.params.id;
  const ticket = await findById(id);
  if (ticket.length > 0) {
    req.ticket = ticket;
    next();
  } else {
    next({
      status: 404,
      message: `ticket with id ${id} does not exist`,
    });
  }
};

const checkTicketType = async (req, res, next) => {
  const ticket_type = req.params.ticket_type;
  const tickets = await findByTicketType(ticket_type);
  if (tickets.length > 0) {
    req.tickets = tickets;
    next();
  } else {
    next({
      status: 404,
      message: `Invalid ticket type: ${ticket_type}`,
    });
  }
};

const validateTicket = async (req, res, next) => {
  try {
    const payload = req.body;
    const validatedTicket = await ticketsSchema.validate(payload);
    if (validatedTicket) {
      next();
    }
  } catch (err) {
    next({
      status: 406,
      message: `Invalid request ticket body ${err.errors[0]}`,
    });
  }
};
module.exports = {
  checkTicketExists,
  checkTicketType,
  validateTicket,
};
