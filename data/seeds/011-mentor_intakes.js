const dummyData = [
  {
    // if changing 'profile_id' or creating new dummy data, use data generated in 002-profiles seed or this seed will error (5/27/2022 LA)
    profile_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    first_name: 'Frank',
    last_name: 'Fusco',
    email: 'fakeFrank2@gmail.com',
    country: 'U.S.',
    state: 'Texas',
    city: 'Dallas',
    current_company: 'Amazin',
    current_position: 'Front-End',
    tech_stack: ['backend', 'UX '],
    industry_knowledge: true,
    pair_programming: true,
    job_help: false,
    commitment: true,
    referred_by: 'My friends says its very rewarding',
    other_info: 'Great idea!',
    validate_status: 'pending',
  },
  {
    profile_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    first_name: 'Paul',
    last_name: 'St. Germain',
    email: 'fakePaul2@gmail.com',
    country: 'U.S.',
    state: 'Virigina',
    city: 'Hershey',
    current_company: 'BloomTech',
    current_position: 'Front-End',
    tech_stack: ['frontend', 'UX', 'android'],
    industry_knowledge: true,
    pair_programming: true,
    job_help: true,
    commitment: true,
    referred_by: 'Found on twitter',
    other_info: 'I am busy on Thursdays',
    validate_status: 'pending',
  },
  {
    profile_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    first_name: 'Robert',
    last_name: 'Sharp',
    email: 'fakeRobert2@gmail.com',
    country: 'U.S.',
    state: 'Oregon',
    city: 'The Woods',
    current_company: 'RedWoodsUnited',
    current_position: 'Backend Engineering Manager',
    tech_stack: ['backend', 'frontend'],
    industry_knowledge: true,
    pair_programming: false,
    job_help: false,
    commitment: true,
    referred_by: '',
    other_info: '',
    validate_status: 'pending',
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
