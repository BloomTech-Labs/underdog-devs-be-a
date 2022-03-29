const db = require('../../data/db-config');

const findAll = async () => {
  //returns names and profile info based on the host
  const meetings = await db('meetings as m')
    .join('profiles as p', 'm.host_id', 'p.profile_id')
    .select('m.*', 'p.first_name', ' p.last_name', 'p.email');
  return meetings;
};

const findByMeetingId = async (meeting_id) => {
  return db.select('*').from('meetings').where({ meeting_id }).first();
};

const findByProfileId = async (profile_id) => {
  return db('meetings')
    .where('host_id', profile_id)
    .orWhere('attendee_id', profile_id);
};

const Create = async (meeting) => {
  const newMeet = await db('meetings').insert(meeting);
  return newMeet;
};

const Update = async (meeting_id, changes) => {
  return db('meetings').where({ meeting_id }).update(changes);
};

const Remove = async (meeting_id) => {
  return db('meetings').where({ meeting_id }).del();
};

module.exports = {
  findAll,
  findByMeetingId,
  findByProfileId,
  Create,
  Update,
  Remove,
};
