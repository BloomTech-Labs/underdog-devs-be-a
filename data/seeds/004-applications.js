const initialData = [
  {
    mentor_intake_id: 2,
    position: 4,
    approved: false,
  },
  {
    mentor_intake_id: 1,
    position: 4,
    approved: false,
  },
  {
    mentor_intake_id: 3,
    position: 4,
    approved: false,
  },
  {
    mentee_intake_id: 2,
    position: 4,
    approved: false,
  },
  {
    mentee_intake_id: 1,
    position: 4,
    approved: false,
  },
  {
    mentee_intake_id: 3,
    position: 4,
    approved: false,
  },
];

exports.seed = function (knex) {
  return knex('applications')
    .del()
    .then(function () {
      return knex('applications').insert(initialData);
    });
};
