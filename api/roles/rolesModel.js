const db = require('../../data/db-config');

const findByProfileId = async (profile_id) => {
  return db.select('*').from('roles').where({ profile_id }).first();
};

module.exports = { findByProfileId };
