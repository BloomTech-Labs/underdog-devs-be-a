const notes = [
  {
    created_by: '00ultx74kMUmEW8054x6',
    content_type: 'type a',
    status: 'in progress',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: '00ultx74kMUmEW8054x6',
    mentee_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    created_by: '00ultwqjtqt4VCcS24x6',
    content_type: 'type a',
    status: 'resolved',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: '00ultx74kMUmEW8054x6',
    mentee_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    created_by: '00ulthapbErVUwVJy4x6',
    content_type: 'type 3a',
    status: 'no action needed',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: true,
    mentor_id: '00ultx74kMUmEW8054x6',
    mentee_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    created_by: '00ultwqjtqt4VCcS24x6',
    content_type: 'type bb',
    status: 'escalated',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: true,
    mentor_id: '00ultx74kMUmEW8054x6',
    mentee_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    created_by: '00ultwew80Onb2vOT4x6',
    content_type: 'type aa',
    status: 'in progress',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_mentor: true,
    visible_to_mentee: false,
    mentor_id: '00ultx74kMUmEW8054x6',
    mentee_id: '00ultwqjtqt4VCcS24x6',
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
