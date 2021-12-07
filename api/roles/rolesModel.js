const db = require('../../data/db-config');

const findByProfileId = async (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('role_id');
};

module.exports = { findByProfileId };
