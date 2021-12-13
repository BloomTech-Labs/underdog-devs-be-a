const db = require('../../data/db-config');

const findByProfileId = (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('role_id');
};

module.exports = { findByProfileId };
