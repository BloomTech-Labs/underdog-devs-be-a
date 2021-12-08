const db = require('../../data/db-config');

const findByMenteeId = (profile_id) => {
  return db('profiles')
    .leftJoin(
      'mentee_progression',
      'profiles.progress_id',
      'mentee_progression.progress_id'
    )
    .where('profiles.profile_id', profile_id)
    .first()
    .select('mentee_progression.progress');
};

module.exports = { findByMenteeId };
