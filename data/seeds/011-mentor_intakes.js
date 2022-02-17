const dummyData = [
  {
    profile_id: '00u13oned0U8XP8Mb4x7',
    email: 'fakeemail2@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Hotdog',
    last_name: 'Jeopardy',
    current_comp: 'Amazin',
    front_end: true,
    back_end: true,
    experience_level: 'expert',
    industry_knowledge: true,
    pair_programming: true,
  },
  {
    profile_id: '9',
    email: 'fakeemail3@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Mr.',
    last_name: 'America',
    ios_mobile: true,
    android_mobile: true,
    experience_level: 'expert',
    industry_knowledge: true,
    job_search: true,
  },
  {
    profile_id: '00u13omswyZM1xVya4x7',
    email: 'fakeemail5@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Carolina',
    last_name: 'Baby',
    current_comp: 'Oil United',
    ios_mobile: true,
    ux_design: true,
    career_development: true,
    experience_level: 'expert',
    pair_programming: true,
    job_search: true,
    other_info: 'i like bagels',
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
