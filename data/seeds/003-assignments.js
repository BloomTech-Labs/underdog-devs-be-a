const dummyData = [
  {
    mentor_id: '7',
    mentee_id: '10',
  },
  {
    mentor_id: '7',
    mentee_id: '11',
  },
  {
    mentor_id: '00u13oned0U8XP8Mb4x7',
    mentee_id: '12',
  },
  {
    mentor_id: '9',
    mentee_id: '10',
  },
];

exports.seed = function (knex) {
  return knex('assignments')
    .del()
    .then(function () {
      return knex('assignments').insert(dummyData);
    });
};
