const db = require('../../data/db-config');

// This function returns all role tickets
const findAll = async () => {
  return db('tickets').select('*');
};

// This function allows you to see what tickets are requesting a mentee or mentor role via ticket type
const findAllMenteeOrMentorRoleTickets = () => {
  return db('tickets as t').select('*').where('t.ticket_type', '=', '2');
};

// This function allows you to see what tickets are requesting a admin role via ticket type
const findAllAdminRoleTickets = () => {
  return db('tickets as t').select('*').where('t.ticket_type', '=', '4');
};

// Allows you to see tickets by ticket_status
const findByTicketStatus = (ticket_status) => {
  return db('tickets').select('*').where({ ticket_status });
};

// This function is for searching for requested roles
const findByRequestedRole = (requested_role) => {
  return db('tickets').where({ requested_role });
};

// Find ticket by id
const findTicketById = (ticket_id) => {
  return db('tickets').where({ ticket_id }).first();
};

// This function allows you to update ticket status
const updateTicketStatus = (ticket_id, ticket_status) => {
  return db('tickets')
    .where({ ticket_id })
    .update({ ticket_status })
    .then(() => {
      return findTicketById(ticket_id);
    });
};

module.exports = {
  findAllMenteeOrMentorRoleTickets,
  findAllAdminRoleTickets,
  findTicketById,
  findByTicketStatus,
  updateTicketStatus,
  findByRequestedRole,
  findAll,
};
