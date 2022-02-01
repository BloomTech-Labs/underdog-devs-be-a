const db = require('../../data/db-config');

const findAllRoleTickets = async () => {
  return await db('role_tickets');
};

const findByRoleTicketById = async (roleTicketId) => {
  return db
    .select('*')
    .from('role_tickets')
    .where('role_ticket_id', roleTicketId)
    .first();
};

module.exports = { findAllRoleTickets, findByRoleTicketById };
