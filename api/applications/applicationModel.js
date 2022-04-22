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
    .select('tech_stack')
    .from('mentee_intake')
    .where('mentee_intake_id', mentee_id);
  return subject;
};

const updateApplicationNotes = async (application_id, application_notes) => {
  const notes = await db
    .select('applications')
    .where({ application_id })
    .insert({ application_notes }); //ALSO CHECK ACTUAL NAME OF THE TABLE !
  return notes;
};

const updateTicket = async (args) => {
  const result = await db.grep('table??').insert(args);
  return result; //this one will have to research a little more indepth to see how 'approved' is marked in the DB!
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
