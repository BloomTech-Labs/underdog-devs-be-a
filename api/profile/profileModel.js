const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('*');
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('profiles')
    .where({ profile_id: id })
    .first()
    .update(profile)
    .returning('*');
};

const updateIsActive = (profile_id, status) => {
  const oppositeStatus = !status;
  db('profiles')
    .where({ profile_id })
    .update({
      is_active: oppositeStatus,
    })
    .then(() => {
      return db('profiles').select('is_active');
    });
};

const remove = async (id) => {
  return await db('profiles').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

async function mentorApplicationData(profile_id) {
  const [person] = await db('mentor_intake as m').where(
    'm.profile_id',
    profile_id
  );

  return person;
}

async function menteeApplicationData(profile_id) {
  const [person] = await db('mentee_intake as m').where(
    'm.profile_id',
    profile_id
  );
  return person;
}

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
  updateIsActive,
  mentorApplicationData,
  menteeApplicationData,
};
