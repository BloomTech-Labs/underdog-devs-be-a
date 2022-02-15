const dummyData = [
  {
    profile_id: '00u13oned0U8XP8Mb4x7',
    email: 'fakeemail2@gmail.com',
    location: 'Bumville, USA',
    first_name: 'Hotdog',
    last_name: 'Jeopardy',
    current_comp: 'Amazin',
    other_tech: 'Node.js, Axios',
    front_end: true,
    back_end: true,
    experience_level: 'expert',
    mentor_commitment: '1:1 sessions - Once a month',
  },
  {
    profile_id: '9',
    email: 'fakeemail3@gmail.com',
    location: 'Bumville, USA',
    first_name: 'Mr.',
    last_name: 'America',
    other_tech: 'JS, HTML',
    ios_mobile: true,
    android_mobile: true,
    experience_level: 'expert',
    mentor_commitment: '1:1 sessions - Once a month',
  },
  {
    profile_id: '00u13omswyZM1xVya4x7',
    email: 'fakeemail5@gmail.com',
    location: 'Carolina, USA',
    first_name: 'Carolina',
    last_name: 'Baby',
    current_comp: 'Oil United',
    other_tech: 'Quickbooks',
    ios_mobile: true,
    ux_design: true,
    experience_level: 'expert',
    mentor_commitment: '1:1 sessions - Once a month',
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
