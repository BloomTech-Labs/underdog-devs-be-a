const dummyData = [
  {
    profile_id: '12',
    email: 'fakeemail1@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Joe',
    last_name: 'Baseball',
    formerly_incarcerated: true,
    list_convictions: 'coded too much',
    tech_stack: 'ios mobile',
    job_help: true,
    low_income: true,
    underrepresented_group: false,
    pair_programming: true,
    heard_about: 'friend_family',
  },
  {
    profile_id: '7',
    email: 'fakeemail4@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Green',
    last_name: 'Man',
    formerly_incarcerated: true,
    list_convictions: 'coded too much',
    tech_stack: 'android mobile',
    low_income: true,
    job_help: true,
    underrepresented_group: false,
    pair_programming: true,
    heard_about: 'facebook',
  },
  {
    profile_id: '10',
    email: 'fakeemail6@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Johnny',
    last_name: 'Donuts',
    formerly_incarcerated: false,
    low_income: true,
    pair_programming: true,
    tech_stack: 'ux design',
    underrepresented_group: false,
    heard_about: 'linkedin',
  },
];

exports.seed = function (knex) {
  return knex('mentee_intake')
    .del()
    .then(function () {
      return knex('mentee_intake').insert(dummyData);
    });
};
