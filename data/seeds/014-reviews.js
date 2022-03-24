exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          review_id: 1,
          review: 'positive',
          mentor_id: '00u13oned0U8XP8Mb4x7',
          mentee_id: 12,
          rating: false,
        },
        {
          review_id: 2,
          review: 'negative',
          mentor_id: '00u13oned0U8XP8Mb4x7',
          mentee_id: 10,
          rating: true,
        },
        {
          review_id: 3,
          review: 'positive',
          mentor_id: '00u13omswyZM1xVya4x7',
          mentee_id: 7,
        },
      ]);
    });
};
