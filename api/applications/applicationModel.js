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

function getPendingMenteeTickets() {
  return db('application_tickets as a')
    .join('mentee_intake as m', 'm.profile_id', 'a.profile_id')
    .where('a.approved', false);
}

function getPendingMentorTickets() {
  return db('application_tickets as a')
    .join('mentor_intake as m', 'm.profile_id', 'a.profile_id')
    .where('a.approved', false);
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
  getPendingMenteeTickets,
  getPendingMentorTickets,
  insertMenteeIntake,
  insertMentorIntake,
  getTicketById,
};
