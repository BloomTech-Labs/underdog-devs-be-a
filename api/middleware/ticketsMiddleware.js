const { findById } = require('../tickets/ticketsModel');

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
module.exports = {
  checkTicketExists,
};
