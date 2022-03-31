const db = require('../../data/db-config');

function getPendingTickets() {
  return db('tickets as t')
    .select('t.*', 'ty.ticket_type')
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .where('t.ticket_status', 'pending')
    .orderBy('ticket_id');
}

function findById(profile_id) {
  return db('tickets as t')
    .select('t.*', 'ty.ticket_type')
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .where('t.submitted_by', profile_id);
}

function findByTicketType(ticket_type) {
  return db('tickets as t')
    .select('t.*', 'ty.ticket_type')
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .where('ty.ticket_type', ticket_type);
}

module.exports = {
  getPendingTickets,
  findById,
  findByTicketType,
};
