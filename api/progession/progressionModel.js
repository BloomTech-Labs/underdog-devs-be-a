const db = require('../../data/db-config');

const findByMenteeId = (profile_id) => {
  return db('mentee_progression')
    .where({ profile_id })
    .first()
    .select('progress');
};

module.exports = { findByMenteeId };
