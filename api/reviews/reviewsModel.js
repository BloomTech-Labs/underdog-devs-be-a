const db = require('../../data/db-config');

const findAll = async () => {
  return db('reviews');
};

const findById = async (review_id) => {
  return db.select('*').from('reviews').where({ review_id }).first();
};

function findByMentorId(id) {
  return db
    .select(
      'r.review_id',
      'r.mentor_id',
      'p.email',
      'p.first_name',
      'p.last_name',
      'p.role_id',
      'p.created_at',
      'p.pending'
    )
    .from('reviews as r')
    .join('profiles as p', 'p.profile_id', '=', 'a.mentor_id')
    .where({ mentee_id: id });
}

function findByMenteeId(id) {
  return db
    .select(
      'r.review_id',
      'r.mentor_id',
      'p.email',
      'p.first_name',
      'p.last_name',
      'p.role_id',
      'p.created_at',
      'p.pending'
    )
    .from('reviews as r')
    .join('profiles as p', 'p.profile_id', '=', 'a.mentor_id')
    .where({ mentee_id: id });
}

async function addReview(review) {
  const newReview = await db('reviews').insert(review);
  return newReview;
}

module.exports = {
  findAll,
  findById,
  findByMentorId,
  addReview,
  findByMenteeId,
};
