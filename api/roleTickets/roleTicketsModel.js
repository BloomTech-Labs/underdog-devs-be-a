// TODO: Refactor these function to fetch data from tickets table instead of role_tickets table

const db = require('../../data/db-config');

const findByRoleTicketById = async (id) => {
  const res = await db.select('*').from('tickets').where({ id }).first();
  return res;
};

module.exports = { findByRoleTicketById };
