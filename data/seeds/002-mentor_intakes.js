const dummyData = [
  {
    // profile_id: '00u13oned0U8XP8Mb4x7',
    email: 'fakeemail2@gmail.com',
    role_id: 3,
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Hotdog',
    last_name: 'Jeopardy',
    current_company: 'Amazin',
    subject: 'backend',
    experience_level: 'expert',
    industry_knowledge: true,
    pair_programming: true,
  },
  {
    // profile_id: '9',
    email: 'fakeemail3@gmail.com',
    role_id: 3,
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Mr.',
    last_name: 'America',
    subject: 'ux design',
    experience_level: 'expert',
    industry_knowledge: true,
    job_help: true,
  },
  {
    // profile_id: '00u13omswyZM1xVya4x7',
    role_id: 3,
    email: 'fakeemail5@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    first_name: 'Carolina',
    last_name: 'Baby',
    current_company: 'Oil United',
    current_position: 'Team Lead',
    subject: 'frontend',
    experience_level: 'expert',
    pair_programming: true,
    job_help: true,
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
