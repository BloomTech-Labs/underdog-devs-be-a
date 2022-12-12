const db = require('../../data/db-config');

const findAll = async () => {
  //returns names and profile info based on the host
  const meetings = await db('meetings as m')
    .join('profiles as mentor', 'm.mentor_id', 'mentor.profile_id')
    .join('profiles as attendee', 'm.mentee_id', 'attendee.profile_id');
  // .select(
  //   'm.*',
  //   'mentor.first_name as mentor.first-name',
  //   'mentor.last_name as mentor.last-name',
  //   'mentor.email as mentor-email',
  //   'attendee.first_name as attendee.first-name',
  //   'attendee.last_name as attendee.last-name',
  //   'attendee.email as attendee-email'
  // );
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
