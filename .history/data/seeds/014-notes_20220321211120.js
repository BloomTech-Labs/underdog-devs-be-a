
const notes = [
  {
  note_id: "",
  content_type: "",
  content:"some text here",
  level:"",
  visible_to_admin:true,
  visible_to_moderator:true,
  visible_to_mentor:true,
  profile_id_mentor:"00ultx74kMUmEW8054x6",
  profile_id_mentee:"00ultwqjtqt4VCcS24x6",
  created_date:Date.now(),
  last_modified_date:Date.now()
];
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
