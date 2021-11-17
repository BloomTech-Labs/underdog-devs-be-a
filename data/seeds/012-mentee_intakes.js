const dummyData = [
  {
    profile_id: '12',
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
  {
    profile_id: '7',
    email: 'fakeemail4@gmail.com',
    location: 'Nevada, USA',
    name: 'Green Man',
    lives_in_us: true,
    formerly_incarcerated: true,
    list_convictions: 'coded too much',
    tech_stack: 'Wix',
    experience_level: '1 years',
    your_hope: 'I want a career in coding too',
  },
  {
    profile_id: '10',
    email: 'fakeemail6@gmail.com',
    location: 'Maine',
    name: 'Johnny Donuts',
    lives_in_us: true,
    formerly_incarcerated: false,
    tech_stack: 'html, myspace',
    experience_level: '5 years',
    your_hope: 'I miss myspace',
  },
];

exports.seed = function (knex) {
  return knex('mentee_intake')
    .del()
    .then(function () {
      return knex('mentee_intake').insert(dummyData);
    });
};
