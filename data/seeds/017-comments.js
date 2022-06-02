exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          comment_id: 1,
          comment_text: 'some text 1',
          note_id: 1,
        },
        {
          comment_id: 2,
          comment_text: 'some text 2',
          note_id: 1,
        },
        {
          comment_id: 3,
          comment_text: 'some text 3',
          note_id: 1,
        },
      ]);
    });
};
