const db = require('../../data/db-config');

const findAll = async () => {
  return await db('meetings');
};

const findByMeetingId = async (meeting_id) => {
  return db.select('*').from('meetings').where({ meeting_id }).first();
};

const findByProfileId = async (profile_id) => {
  return db('meetings')
    .where('host_id', profile_id)
    .orWhere('attendee_id', profile_id);
};

module.exports = { findAll, findByMeetingId, findByProfileId };
