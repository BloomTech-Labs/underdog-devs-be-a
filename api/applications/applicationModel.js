const db = require('../../data/db-config');

async function add(id, newApplication) {
  newApplication.profile_id = id;
  const ticket = await db('application_tickets').insert(newApplication);
  return ticket;
}

function getTicketById(application_id) {
  return db('application_tickets')
    .where('application_id', application_id)
    .first();
}

function getPendingTickets() {
  return db('application_tickets').where('approved', false);
}

function updateTicket(application_id, changes) {
  return db('application_tickets')
    .where('application_id', application_id)
    .first()
    .update(changes);
}

module.exports = { add, updateTicket, getPendingTickets, getTicketById };
