const dummyData = [
  {
    application_id: 1,
    email: 'fakeemail1@gmail.com',
    location: 'California, USA',
    name: 'Joe Baseball',
    lives_in_us: true,
    formerly_incarcerated: true,
    list_convictions: 'coded too much',
    tech_stack: 'HTML/CSS/JS',
    experience_level: '2 years',
    your_hope: 'I want a career in coding',
    other_info: 'Not really',
  },
];

exports.seed = function (knex) {
  return knex('mentee_intake')
    .del()
    .then(function () {
      return knex('mentee_intake').insert(dummyData);
    });
};
