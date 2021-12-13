const db = require('../../data/db-config');

const findAllLabels = async () => {
  return await db('mentee_progression');
};

const findRoleIdByProfileId = (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('role_id');
};

const findCurrentProgress = (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('progress_id');
};

const findByMenteeId = (profile_id) => {
  return db('profiles as p')
    .leftJoin('mentee_progression as mp', 'p.progress_id', 'mp.progress_id')
    .where('p.profile_id', profile_id)
    .first()
    .select('mp.progress');
};

const updateMenteeProgress = (profile_id, progress_id) => {
  return db('profiles')
    .where({ profile_id })
    .update({ progress_id })
    .then(() => {
      return findByMenteeId(profile_id);
    });
};

module.exports = {
  findByMenteeId,
  findRoleIdByProfileId,
  findAllLabels,
  updateMenteeProgress,
  findCurrentProgress,
};
