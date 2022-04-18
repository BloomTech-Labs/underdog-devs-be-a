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

module.exports = {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
  insertMentorIntake,
  insertMenteeIntake,
};
