// TODO: Refactor these function to fetch data from tickets table instead of application_tickets table
//FIRST, let's dig into the database wooo
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

module.exports = {
  getTicketById,
  getMentorIntake,
  getMenteeIntake,
};
