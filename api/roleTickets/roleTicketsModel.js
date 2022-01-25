const db = require('../../data/db-config');

const findAllRoleTickets = async () => {
  return await db('role_tickets');
};

module.exports = { findAllRoleTickets };
