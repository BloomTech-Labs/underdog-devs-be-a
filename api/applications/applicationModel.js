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
  console.log(newMentorApplication);
  const newMentorIntake = await db('mentor_intake').insert(
    newMentorApplication
  );
  return newMentorIntake;
};

const insertMenteeIntake = async (newMenteeApplication) => {
  // console.log(newMenteeApplication);
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

//currently (4/22), there is no 'applications' table; these notes instead exist as a column on the 'tickets' table. These will need to be updated if we do create a dedicated applications table!
const updateApplicationNotes = async (application_id, application_notes) => {
  const notes = await db
    .select('tickets')
    .where('ticket_id', application_id)
    .insert('notes', application_notes);
  return notes;
};

const updateTicket = async (application_id) => {
  const result = await db('tickets')
    .where(application_id)
    .update({ approved: true });
  return result;
};

const getApplications = () => {
  return db('profiles as p')
    .join('roles as r', 'p.role_id', 'r.role_id')
    .join('tickets as t', 'p.profile_id', 't.submitted_by')
    .select(
      't.ticket_id as application_id',
      'p.profile_id',
      'p.first_name',
      'p.last_name',
      'p.email',
      'p.created_at',
      'r.role_name'
    )
    .where('t.ticket_type', 2)
    .where('t.ticket_status', 'pending');
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
  getApplications,
};
