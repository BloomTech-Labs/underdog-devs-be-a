const db = require('../../data/db-config');

const findAll = async () => {
  return await db('assignments');
};

const findById = async (assignment_id) => {
  return db.select('*').from('assignments').where({ assignment_id }).first();
};

function findByMentorId(id) {
  return db
    .select(
      'a.assignment_id',
      'a.mentee_id',
      'p.email',
      'p.first_name',
      'p.last_name',
      'p.role_id',
      'p.created_at',
      'p.pending'
    )
    .from('assignments as a')
    .join('profiles as p', 'p.profile_id', '=', 'a.mentee_id')
    .where({ mentor_id: id });
}

function findByMenteeId(id) {
  return db
    .select(
      'a.assignment_id',
      'a.mentor_id',
      'p.email',
      'p.first_name',
      'p.last_name',
      'p.role_id',
      'p.created_at',
      'p.pending'
    )
    .from('assignments as a')
    .join('profiles as p', 'p.profile_id', '=', 'a.mentor_id')
    .where({ mentee_id: id });
}
async function Create(assign) {
  const newAssign = await db('assignments').insert(assign);
  return newAssign;
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
  Create,
  Update,
  Remove,
};
