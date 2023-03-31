const profiles = [
  {
    user_id: '63447d355e87a0a75163b000',
    profile_id: 'e1465095-e695-4e02-8fb2-19ed5bf5a132',
    role: 'mentor',
  },
  {
    user_id: '63447d6be85cb425b0fed278',
    profile_id: '882eb36a-d154-480d-89d4-a1cad1aa7330',
    role: 'mentor',
  },
  {
    user_id: '63447d947fcf35be70c04218',
    profile_id: 'ba1ac6b7-5b29-449f-8d7e-84a04061510a',
    role: 'mentor',
  },
  {
    user_id: '63447dbe1045d02cbb96c3f5',
    profile_id: 'c2fa3005-91a4-4ed0-8227-77c6e1bf3747',
    role: 'mentee',
  },
  {
    user_id: '63447ddfe85cb425b0fed28e',
    profile_id: '50ef4f37-b8bd-4c93-a9a3-625e38c2c5cb',
    role: 'mentee',
  },
  {
    user_id: '63447e44122f623f0ff83631',
    profile_id: 'aa388259-28a9-4fa3-a988-ec08070a4f2e',
    role: 'mentee',
  },
  // bear001
  {
    user_id: '57575473563cb2353260e',
    profile_id: 'auth0|62e4439b9b1f5f6077c26aab',
    role: 'admin',
  },
  // bear002
  {
    user_id: '36537y357143g3464t43g3',
    profile_id: 'auth0|62e443bde8116e9fce827b52',
    role: 'mentor',
  },
  // bear003
  {
    user_id: '989071241356n35ung325',
    profile_id: 'auth0|62e443dfdf1dad2163efdb89',
    role: 'mentor',
  },
  // bear004
  {
    user_id: '3405709746j46425098080e',
    profile_id: 'auth0|62e443f59b1f5f6077c26ab9',
    role: 'mentee',
  },
  // bear005
  {
    user_id: '245097896214607f09708e',
    profile_id: 'auth0|62e44408e1c5006f71b0f30a',
    role: 'mentee',
  },
  // bear006
  {
    user_id: '23407298569f09708739542j',
    profile_id: 'auth0|62e444269b1f5f6077c26abd',
    role: 'mentee',
  },
  // bear007
  {
    user_id: '235908798640609780325jd34',
    profile_id: 'auth0|62e444448fc49f84e9d39497',
    role: 'mentee',
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
