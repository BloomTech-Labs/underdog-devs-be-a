const { findById, findByTicketType } = require('../tickets/ticketsModel');

const checkTicketExists = async (req, res, next) => {
  const id = req.params.id;
  const ticket = await findById(id);
  if (ticket.length > 1) {
    req.ticket = ticket;
    next();
  } else {
    next({
      status: 400,
      message: `ticket with id ${id} does not exist`,
    });
  }
};

const checkTicketType = async (req, res, next) => {
  const ticket_type = req.params.ticket_type;
  const tickets = await findByTicketType(ticket_type);
  if (tickets.length > 1) {
    req.tickets = tickets;
    next();
  } else {
    next({
      status: 400,
      message: `Invalid ticket type: ${ticket_type}`,
    });
  }
};
module.exports = {
  checkTicketExists,
  checkTicketType,
};
