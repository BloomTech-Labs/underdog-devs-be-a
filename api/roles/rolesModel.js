const db = require('../../data/db-config');

const findAllRoles = async () => {
  return await db('roles');
};

const findByProfileId = (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('role_id');
};

const updateProfileRoleId = (profile_id, role_id) => {
  return db('profiles')
    .where({ profile_id })
    .update({ role_id })
    .then(() => {
      return findByProfileId(profile_id);
    });
};

module.exports = { findByProfileId, findAllRoles, updateProfileRoleId };
