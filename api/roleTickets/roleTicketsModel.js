// TODO: Refactor these function to fetch data from tickets table instead of role_tickets table
const db = require('../../data/db-config');

const findAllTickets = () => {
  return db('tickets');
};

const findByTicketStatus = (ticket_status) => {
  return db('tickets').where({ ticket_status });
};

const findTicketById = (ticket_id) => {
  return db('tickets').where({ ticket_id });
};

const findByRequestedRole = (requested_role) => {
  return db('tickets').where({ requested_role });
};

const updateTicketStatus = (ticket_id, ticket_status) => {
  return db('tickets')
    .where({ ticket_id })
    .update({ ticket_status })
    .then(() => {
      return findTicketById(ticket_id);
    });
};

module.exports = {
  findAllTickets,
  findTicketById,
  findByTicketStatus,
  updateTicketStatus,
  findByRequestedRole,
};
