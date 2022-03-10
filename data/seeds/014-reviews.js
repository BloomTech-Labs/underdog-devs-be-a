
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {review_id: 1, review: 'positive',mentor_intake_id:1,mentee_intake_id:1},
        {review_id: 2, review: 'negative',mentor_intake_id:3,mentee_intake_id:2},
        {review_id: 3, review: 'positive',mentor_intake_id:2,mentee_intake_id:3}
      ]);
    });
};
