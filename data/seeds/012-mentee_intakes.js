const dummyData = [
  {
    profile_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    email: 'fakeemail1@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Joe',
    last_name: 'Baseball',
    formerly_incarcerated: true,
    convictions: 'coded too much',
    tech_stack: 'ios mobile',
    job_help: true,
    low_income: true,
    underrepresented_group: false,
    pair_programming: true,
    referred_by: 'friend_family',
  },
  {
    profile_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    email: 'fakeemail4@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Green',
    last_name: 'Man',
    formerly_incarcerated: true,
    convictions: 'coded too much',
    tech_stack: 'android mobile',
    low_income: true,
    job_help: true,
    underrepresented_group: false,
    pair_programming: true,
    referred_by: 'facebook',
  },
  {
    profile_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
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
    referred_by: 'linkedin',
  },
];

exports.seed = function (knex) {
  return knex('mentee_intake')
    .del()
    .then(function () {
      return knex('mentee_intake').insert(dummyData);
    });
};
