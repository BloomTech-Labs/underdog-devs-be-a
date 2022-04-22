const db = require('../../data/db-config');

const getTicketById = async (ticket_id) => {
  return db.select('*').from('tickets').where({ ticket_id }).first();
};

const getMentorIntake = async (mentor_intake_id) => {
  return db
    .select('*')
    .from('mentor_intake')
    .where({ mentor_intake_id })
    .first();
};

const getMenteeIntake = async (mentee_intake_id) => {
  return db
    .select('*')
    .from('mentee_intake')
    .where({ mentee_intake_id })
    .first();
};

const insertMentorIntake = async (newMentorApplication) => {
  const newMentorIntake = await db('mentor_intake').insert(
    newMentorApplication
  );
  return newMentorIntake;
};

const insertMenteeIntake = async (newMenteeApplication) => {
  const newMenteeIntake = await db('mentee_intake').insert(
    newMenteeApplication
  );
  return newMenteeIntake;
};

const add = async (applicationTicket) => {
  const newTicket = await db('tickets').insert(applicationTicket);
  return newTicket;
};

const getMenteeSubject = async (mentee_id) => {
  const subject = await db
    .select('subject')
    .from('mentee_intake')
    .where('mentee_intake_id', mentee_id);
  return subject;
};

const updateApplicationNotes = async (application_id, application_notes) => {
  const notes = await db
    .select('tickets')
    .where({ application_id })
    .insert({ application_notes });
  return notes;
};

const updateTicket = async (application_id) => {
  const result = await db('tickets')
    .where(application_id)
    .update({ approved: true });
  return result;
};

module.exports = {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
  insertMentorIntake,
  insertMenteeIntake,
  add,
  getMenteeSubject,
  updateApplicationNotes,
  updateTicket,
};
