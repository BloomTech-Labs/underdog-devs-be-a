const dummyData = [
  {
    submitted_by: '00ulthapbErVUwVJy4x6',
    subject_id: '00ulthapbErVUwVJy4x6',
    requested_role: 1,
    approved_by: '00ulthapbErVUwVJy4x6',
    comments: 'This is my 1st dummy data comment',
    pending: true,
    resolved: false,
  },
  {
    submitted_by: '00ulthapbErVUwVJy4x6',
    subject_id: '00ulthapbErVUwVJy4x6',
    requested_role: 1,
    approved_by: '00ulthapbErVUwVJy4x6',
    comments: 'This is my 2nd dummy data comment',
    pending: true,
    resolved: false,
  },
];

exports.seed = function (knex) {
  return knex('role_tickets')
    .del()
    .then(function () {
      return knex('role_tickets').insert(dummyData);
    });
};
