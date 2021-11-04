const db = require('../../data/db-config');

// File created to prevent merge conflicts

async function add(id, newApplication) {
  newApplication.profile_id = id;
  console.log(newApplication);
  const ticket = await db('application_tickets').insert(newApplication);
  console.log(ticket);
  return ticket;
}

module.exports = { add };
