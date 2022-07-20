const db = require('../../data/db-config');

const findAll = () => {
  return db('notes');
};

const filterBy = (filter) => {
  return db('notes').where(filter);
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
const getNoteComments = (id) => {
  return db
    .from('comments as c')
    .innerJoin('notes as n', 'c.note_id', 'n.note_id')
    .select('comment_text', 'n.created_by', 'n.note_id')
    .where('n.note_id', id);
};
const createNoteComments = (comment) => {
  return db('comments').insert(comment).returning('*');
};
module.exports = {
  findAll,
  filterBy,
  findBy,
  findById,
  create,
  update,
  remove,
  getNoteComments,
  createNoteComments,
};
