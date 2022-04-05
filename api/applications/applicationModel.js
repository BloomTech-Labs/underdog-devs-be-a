// TODO: Refactor these function to fetch data from tickets table instead of application_tickets table

const db = require('../../data/db-config');

function add(newApplication) {
  return db('application_tickets').insert(newApplication);
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
      'a.application_id',
      'a.application_notes',
      'p.email'
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
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('mentor_intake as m', 'a.profile_id', 'm.profile_id')
    .join('roles as r', 'p.role_id', 'r.role_id')
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
      'm.first_name',
      'm.last_name',
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
    .where('p.profile_id', profile_id)
    .first();
}

function insertMenteeIntake(newMenteeIntake) {
  return db('mentee_intake').insert(newMenteeIntake);
}

function insertMentorIntake(newMentorIntake) {
  return db('mentor_intake').insert(newMentorIntake);
}

function updateTicket(application_id, changes) {
  return db('application_tickets')
    .where('application_id', application_id)
    .first()
    .update(changes);
}

function updateApplicationNotes(application_id, noteChanges) {
  return db('application_tickets')
    .where('application_id', application_id)
    .first()
    .update('application_notes', noteChanges, [
      'application_tickets.application_notes as new_notes',
    ]);
}

function getMenteeSubject(mentee_intake_id) {
  return db('mentee_intake as m')
    .select('m.subject')
    .where('mentee_intake_id', mentee_intake_id)
    .first();
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
  updateApplicationNotes,
  getMenteeSubject,
};
