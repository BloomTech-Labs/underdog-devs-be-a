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
    ios_mobile: true,
    android_mobile: true,
    experience_level: '2 years',
    industry_knowledge: true,
    job_search: true,
    other_info: 'Not really',
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
    front_end: true,
    back_end: true,
    experience_level: '1 years',
    low_income: true,
    industry_knowledge: true,
    job_search: true,
    underrepresented_group: false,
    career_development: true,
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
    ios_mobile: true,
    android_mobile: true,
    experience_level: '5 years',
    low_income: true,
    pair_programming: true,
    career_development: true,
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
