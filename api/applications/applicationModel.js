const db = require('../../data/db-config');

async function add(id, newApplication) {
  newApplication.profile_id = id;
  const ticket = await db('application_tickets').insert(newApplication);
  return ticket;
}

module.exports = { add };
