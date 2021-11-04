const db = require('../../data/db-config');

// File created to prevent merge conflicts

async function add(profile_id, newApplication) {
  const [ticket] = await db('application_tickets').insert({
    ...newApplication,
    profile_id,
  });
  return ticket;
}

module.exports = { add };
