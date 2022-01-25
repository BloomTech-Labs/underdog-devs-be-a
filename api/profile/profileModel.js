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

function mentorApplicationData(profile_id) {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('mentor_intake as m', 'a.profile_id', 'm.profile_id')
    .join('roles as r', 'p.role_id', 'r.role_id')
    .select(
      'm.profile_id',
      'm.name',
      'm.email',
      'm.location',
      'm.current_comp',
      'm.tech_stack',
      'm.can_commit',
      'm.how_commit',
      'm.other_info',
      'r.role_name',
      'a.approved'
    )
    .where('p.profile_id', profile_id)
    .first();
}

function menteeApplicationData(profile_id) {
  return db('application_tickets as a')
    .join('profiles as p', 'a.profile_id', 'p.profile_id')
    .join('mentee_intake as m', 'a.profile_id', 'm.profile_id')
    .join('roles as r', 'p.role_id', 'r.role_id')
    .select(
      'm.profile_id',
      'm.name',
      'm.email',
      'm.location',
      'm.lives_in_us',
      'm.formerly_incarcerated',
      'm.list_convictions',
      'm.tech_stack',
      'm.experience_level',
      'm.your_hope',
      'm.other_info',
      'r.role_name',
      'a.approved'
    )
    .where('p.profile_id', profile_id);
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
