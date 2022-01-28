const dummyData = [
  {
    profile_id: '00u13oned0U8XP8Mb4x7',
    email: 'fakeemail2@gmail.com',
    location: 'Bumville, USA',
    first_name: 'Hotdog',
    last_name: 'Jeopardy',
    current_comp: 'Amazin',
    tech_stack: 'Node.js, Axios',
    can_commit: false,
    how_commit: '1:1 sessions - Once a month',
  },
  {
    profile_id: '9',
    email: 'fakeemail3@gmail.com',
    location: 'Bumville, USA',
    first_name: 'Mr.',
    last_name: 'America',
    tech_stack: 'JS, HTML',
    can_commit: true,
  },
  {
    profile_id: '00u13omswyZM1xVya4x7',
    email: 'fakeemail5@gmail.com',
    location: 'Carolina, USA',
    first_name: 'Carolina',
    last_name: 'Baby',
    current_comp: 'Oil United',
    tech_stack: 'Quickbooks',
    can_commit: true,
    how_commit: 'Daily, 9 hours',
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
