const db = require('../../data/db-config');

async function add(id, newApplication) {
  newApplication.profile_id = id;
  const ticket = await db('application_tickets').insert(newApplication);
  return ticket;
}

function getTicketById(application_id) {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('roles as r', 'r.role_id', 'p.role_id')
    .select(
      'p.profile_id',
      'p.first_name',
      'p.last_name',
      'r.role_name',
      'a.created_at',
      'a.application_id'
    )
    .where('application_id', application_id)
    .first();
}

function getPendingTickets() {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('roles as r', 'r.role_id', 'p.role_id')
    .select(
      'p.profile_id',
      'p.first_name',
      'p.last_name',
      'r.role_name',
      'a.created_at',
      'a.application_id'
    )
    .where('a.approved', false);
}

function getPendingTicketsByRole(role_name) {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('roles as r', 'r.role_id', 'p.role_id')
    .select(
      'p.profile_id',
      'p.first_name',
      'p.last_name',
      'r.role_name',
      'a.created_at',
      'a.application_id'
    )
    .where('a.approved', false)
    .where('r.role_name', role_name);
}

async function insertMenteeIntake(id, newMenteeIntake) {
  newMenteeIntake.profile_id = id;
  const form = await db('mentee_intake').insert(newMenteeIntake);
  return form;
}

async function insertMentorIntake(id, newMentorIntake) {
  newMentorIntake.profile_id = id;
  const form = await db('mentor_intake').insert(newMentorIntake);
  return form;
}

function updateTicket(application_id, changes) {
  return db('application_tickets')
    .where('application_id', application_id)
    .first()
    .update(changes);
}

module.exports = {
  add,
  updateTicket,
  getPendingTickets,
  getPendingTicketsByRole,
  insertMenteeIntake,
  insertMentorIntake,
  getTicketById,
};
