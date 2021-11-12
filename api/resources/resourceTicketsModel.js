const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resource_tickets');
};

const findByTicketId = async (resource_ticket_id) => {
  return db
    .select('*')
    .from('resource_tickets')
    .where({ resource_ticket_id })
    .first();
};

const getByProfileId = async (profile_id) => {
  return db('resource_tickets').where('submitted_by', profile_id);
};

const Create = async (id, newTicket) => {
  newTicket.submitted_by = id;
  const ticket = await db('resource_tickets').insert(newTicket);
  return ticket;
};

const Update = async (resource_ticket_id, changes) => {
  return db('resource_tickets').where({ resource_ticket_id }).update(changes);
};

const Delete = async (resource_ticket_id) => {
  return db('resource_tickets').where({ resource_ticket_id }).del();
};

module.exports = {
  findAll,
  findByTicketId,
  getByProfileId,
  Create,
  Update,
  Delete,
};
