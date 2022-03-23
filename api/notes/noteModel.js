const db = require('../../data/db-config');

const findAll = () => {
  return db('notes');
};

const findBy = (filter) => {
  return db('notes').where(filter).first();
};

const findById = (note_id) => {
  return db('notes').where({ note_id }).first().select('*');
};

const create = (note) => {
  return db('notes').insert(note).returning('*');
};

const update = (id, note) => {
  return db('notes').where({ note_id: id }).first().update(note).returning('*');
};

const remove = (id) => {
  return db('notes').where({ note_id: id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
