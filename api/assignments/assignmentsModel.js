// File created to prevent merge conflicts
const db = require('../../data/db-config');

const findAll = async () => {
  return await db('assignments');
};

const findById = async (assignment_id) => {
  return db('assignments').where({ assignment_id }).first();
};

function findByMentorId(id) {
  return db.select('*').from('assignments as a').where({ mentor_id: id });
}

function findByMenteeId(id) {
  return db.select('*').from('assignments as a').where({ mentee_id: id });
}
async function Add(ass) {
  const [newAss] = await db('assignments').insert(ass);
  const result = await findById(newAss);
  return result;
}

function Update(assignment_id, changes) {
  return db('assignments').where({ assignment_id }).update(changes);
}

function Remove(assignment_id) {
  return db('assignments').where({ assignment_id }).del();
}

module.exports = {
  findAll,
  findById,
  findByMentorId,
  findByMenteeId,
  Add,
  Update,
  Remove,
};
