const dummyData = [
  {
    // if changing 'profile_id' or creating new dummy data, use data generated in 002-profiles seed or this seed will error (5/27/2022 LA)
    profile_id: '00ultwew80Onb2vOT4x6',
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
    commitment: 'yes',
    referred_by: 'My friends says its very rewarding',
    other_info: 'Great idea!',
  },
  {
    profile_id: '00ultwz1n9ORpNFc04x6',
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
    commitment: 'yes',
    referred_by: 'Found on twitter',
    other_info: 'I am busy on Thursdays',
  },
  {
    profile_id: '00ulthapbErVUwVJy4x6',
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
    commitment: 'no',
    referred_by: '',
    other_info: '',
  },
];

exports.seed = function (knex) {
  return knex('mentor_intake')
    .del()
    .then(function () {
      return knex('mentor_intake').insert(dummyData);
    });
};
