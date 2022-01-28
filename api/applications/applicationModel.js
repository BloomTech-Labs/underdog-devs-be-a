const db = require('../../data/db-config');

async function add(newApplication) {
  const ticket = await db('application_tickets').insert(newApplication);
  return ticket;
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

function getTicketById(profile_id) {
  return db('application_tickets as a')
    .select('*')
    .where('a.profile_id', profile_id)
    .first();
}

function getMentorIntake(profile_id) {
  return db('mentor_intake as m')
    .select('*')
    .where('m.profile_id', profile_id)
    .first();
}

function getMenteeIntake(profile_id) {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('mentee_intake as m', 'a.profile_id', 'm.profile_id')
    .join('roles as r', 'p.role_id', 'r.role_id')
    .select(
      'm.profile_id',
      'm.name',
      'm.email',
      'm.location',
      'm.lives_in_us',
      'm.formerly_incarcerated',
      'm.list_convictions',
      'm.tech_stack',
      'm.experience_level',
      'm.your_hope',
      'm.other_info',
      'r.role_name',
      'a.approved'
    )
    .where('p.profile_id', profile_id);
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
  getTicketById,
  getPendingTickets,
  getPendingTicketsByRole,
  getMentorIntake,
  getMenteeIntake,
  insertMenteeIntake,
  insertMentorIntake,
};
