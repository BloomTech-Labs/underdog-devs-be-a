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
    subject: 'ios mobile',
    experience_level: '2 years',
    industry_knowledge: true,
    job_help: true,
    low_income: true,
    underrepresented_group: false,
    pair_programming: true,
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
    subject: 'android mobile',
    experience_level: '1 years',
    low_income: true,
    industry_knowledge: true,
    job_help: true,
    underrepresented_group: false,
    pair_programming: true,
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
    experience_level: '5 years',
    low_income: true,
    pair_programming: true,
    subject: 'ux design',
    underrepresented_group: false,
  },
];

exports.seed = function (knex) {
  return knex('mentee_intake')
    .del()
    .then(function () {
      return knex('mentee_intake').insert(dummyData);
    });
};
