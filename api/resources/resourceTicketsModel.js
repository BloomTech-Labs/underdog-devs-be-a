const db = require('../../data/db-config');

// This function returns everything from the tickets table
const findAll = async () => {
  let result = await db('tickets');
  return result;
};

// This function allows you to get ticket by request
const getByRequest = (requested_for) => {
  return db('tickets').where({ requested_for }).select('*');
};

// This function allows you to get ticket by who submitted the ticket
const getBySubmit = (submitted_by) => {
  return db('tickets').where({ submitted_by }).select('*');
};

// Find ticket by id
const findTicketById = (ticket_id) => {
  return db('tickets').where({ ticket_id }).first();
};

//This function allows you to update the ticket subject based on who the ticket is requested for
const updateTicketSubject = (ticket_id, ticket_subject) => {
  return db('tickets')
    .where({ ticket_id })
    .update({ ticket_subject })
    .then(() => {
      return findTicketById(ticket_id);
    });
};

//This function allows you to remove tickets by ticket_id
const remove = (ticket_id) => {
  return db('tickets').where({ ticket_id }).del();
};

module.exports = {
  findAll,
  getByRequest,
  getBySubmit,
  updateTicketSubject,
  remove,
  findTicketById,
};
