const notes = [
  {
    created_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    content_type: 'type a',
    status: 'in progress',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    mentee_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
  },
  {
    created_by: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    content_type: 'type a',
    status: 'resolved',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
  },
  {
    created_by: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    content_type: 'type 3a',
    status: 'no action needed',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: true,
    mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    mentee_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
  },
  {
    created_by: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    content_type: 'type bb',
    status: 'escalated',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: true,
    mentor_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    mentee_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
  },
  {
    created_by: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    content_type: 'type aa',
    status: 'in progress',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    mentee_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert(notes);
    });
};
