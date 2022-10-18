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
          mentor_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
          mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
          rating: false,
        },
        {
          review_id: 2,
          review: 'negative',
          mentor_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
          mentee_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
          rating: true,
        },
        {
          review_id: 3,
          review: 'positive',
          mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
          mentee_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
          rating: true
        },
      ]);
    });
};
