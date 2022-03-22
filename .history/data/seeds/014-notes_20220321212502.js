const notes = [
  {
    note_id: '00ulthapbErVUwnote01',
    content_type: 'type a',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_moderator: true,
    visible_to_mentor: true,
    profile_id_mentor: '00ultx74kMUmEW8054x6',
    profile_id_mentee: '00ultwqjtqt4VCcS24x6',
  },
  {
    note_id: '00ulthapbErVUwnote01',
    content_type: 'type a',
    content: 'expect some text here',
    level: 'low',
    visible_to_admin: true,
    visible_to_moderator: true,
    visible_to_mentor: true,
    profile_id_mentor: '00ultx74kMUmEW8054x6',
    profile_id_mentee: '00ultwqjtqt4VCcS24x6',
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
