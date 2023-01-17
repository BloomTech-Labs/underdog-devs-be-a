const profiles = [
  {
    user_id: '63447d355e87a0a75163b000',
    profile_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    role_id: 3,
  },
  {
    user_id: '63447d6be85cb425b0fed278',
    profile_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    role_id: 3,
  },
  {
    user_id: '63447d947fcf35be70c04218',
    profile_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    role_id: 3,
  },
  {
    user_id: '63447dbe1045d02cbb96c3f5',
    profile_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
    role_id: 4,
  },
  {
    user_id: '63447ddfe85cb425b0fed28e',
    profile_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    role_id: 4,
  },
  {
    user_id: '63447e44122f623f0ff83631',
    profile_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    role_id: 4,
  },
];

exports.seed = function (knex) {
  return knex('profiles')
    .del()
    .then(function () {
      return knex('profiles').insert(profiles);
    });
};

exports.profiles = { profiles };
