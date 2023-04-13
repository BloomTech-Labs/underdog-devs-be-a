const profiles = [
  {
    profile_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    role: 'mentor',
    approved: true,
  },
  {
    // DELETE THESE V "user_id"
    profile_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    role: 'mentor',
    approved: true,
  },
  {
    profile_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    role: 'mentor',
    approved: true,
  },
  {
    profile_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
    role: 'mentee',
    approved: true,
  },
  {
    profile_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    role: 'mentee',
    approved: true,
  },
  {
    profile_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    role: 'mentee',
    approved: true,
  },
  // bear001
  {
    profile_id: 'auth0|62e4439b9b1f5f6077c26aab',
    role: 'admin',
    approved: true,
  },
  // bear002
  {
    profile_id: 'auth0|62e443bde8116e9fce827b52',
    role: 'mentor',
    approved: true,
  },
  // bear003
  {
    profile_id: 'auth0|62e443dfdf1dad2163efdb89',
    role: 'mentor',
    approved: true,
  },
  // bear004
  {
    profile_id: 'auth0|62e443f59b1f5f6077c26ab9',
    role: 'mentee',
    approved: true,
  },
  // bear005
  {
    profile_id: 'auth0|62e44408e1c5006f71b0f30a',
    role: 'mentee',
    approved: true,
  },
  // bear006
  {
    profile_id: 'auth0|62e444269b1f5f6077c26abd',
    role: 'mentee',
    approved: true,
  },
  // bear007
  {
    profile_id: 'auth0|62e444448fc49f84e9d39497',
    role: 'mentee',
    approved: true,
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
