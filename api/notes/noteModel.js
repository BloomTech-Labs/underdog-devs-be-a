const db = require('../../data/db-config');

const findAll = () => {
  return db('notes');
};

const findBy = (filter) => {
  return db('notes').where(filter);
};

const findById = (profile_id) => {
  return db('notes').where({ profile_id }).first().select('*');
};

const create = (profile) => {
  return db('notes').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('notes')
    .where({ note_id: id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = (id) => {
  return db('notes').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
