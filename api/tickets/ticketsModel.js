const db = require('../../data/db-config');
function getPendingTickets() {
  return db('tickets as t')
    .select(
      't.ticket_id',
      't.ticket_type',
      't.ticket_status',
      't.ticket_subject',
      't.submitted_by',
      'p.first_name',
      'p.last_name',
      't.urgent',
      't.notes',
      't.created_at',
      'ty.ticket_type'
    )
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .join('profiles as p', 't.submitted_by', 'p.profile_id')
    .where('t.ticket_status', 'pending')
    .orderBy('ticket_id');
}

function findById(profile_id) {
  return db('tickets as t')
    .select(
      't.ticket_id',
      't.ticket_type',
      't.ticket_status',
      't.ticket_subject',
      'p.first_name',
      'p.last_name',
      't.urgent',
      't.notes',
      't.created_at',
      'ty.ticket_type'
    )
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .join('profiles as p', 't.submitted_by', 'p.profile_id')
    .where('t.submitted_by', profile_id);
}
function findTicketById(ticket_id) {
  return db('tickets as t').select('t.*').where('t.ticket_id', ticket_id);
}

function findByTicketType(ticket_type) {
  return db('tickets as t')
    .select(
      't.ticket_id',
      't.ticket_type',
      't.ticket_status',
      't.ticket_subject',
      'p.first_name',
      'p.last_name',
      't.urgent',
      't.notes',
      't.created_at',
      'ty.ticket_type'
    )
    .join('ticket_types as ty', 't.ticket_type', 'ty.ticket_type_id')
    .join('profiles as p', 't.submitted_by', 'p.profile_id')
    .where('ty.ticket_type', ticket_type);
}

async function add(ticket) {
  const { ticket_type_id } = await db('ticket_types as ty')
    .select('ty.ticket_type_id')
    .where('ty.ticket_type', ticket.ticket_type)
    .first();
  return db('tickets as t').insert({ ...ticket, ticket_type: ticket_type_id });
}

function updateTicketStatus(ticket_id, ticket_status) {
  return db('tickets')
    .update({ ticket_status: ticket_status })
    .where({ ticket_id: ticket_id })
    .returning('*');
}

function updateNotes(ticket_id, changes) {
  return db('tickets')
    .update({ notes: changes })
    .where({ ticket_id: ticket_id })
    .returning('*');
}

function remove(ticket_id) {
  return db('tickets').where({ ticket_id: ticket_id }).del();
}

module.exports = {
  getPendingTickets,
  findById,
  findTicketById,
  findByTicketType,
  add,
  updateTicketStatus,
  updateNotes,
  remove,
};
