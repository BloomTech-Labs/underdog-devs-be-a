const db = require('../../data/db-config');

const findRoleIdByProfileId = (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('role_id');
};

const findByMenteeId = (profile_id) => {
  return db('profiles as p')
    .leftJoin('mentee_progression as mp', 'p.progress_id', 'mp.progress_id')
    .where('p.profile_id', profile_id)
    .first()
    .select('mp.progress');
};

module.exports = { findByMenteeId, findRoleIdByProfileId };
