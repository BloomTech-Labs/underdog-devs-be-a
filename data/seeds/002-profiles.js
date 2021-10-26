const profiles = [...new Array(12)].map((i, idx) => ({
  user_id: idx + 1,
  email: `llama00${idx + 1}@maildrop.cc`,
  first_name: idx < 2 ? `Admin` : idx == 2 ? `Moderator` : `User`,
  last_name: idx < 2 ? `${idx + 1}` : `${idx + 1}`,
  role_id: idx < 2 ? 1 : idx == 2 ? 2 : 3,
  pending: idx < 6 ? false : true,
}));

profiles[0].user_id = '00u19v1wwrVU5Ui1j5d7';
profiles[1].user_id = '00u1humq824KiXNFp5d7';
profiles[2].user_id = '00u19v66wqTNTSBw85d7';
profiles[3].user_id = '00ulzenirO3Evj2U95d6';
profiles[4].user_id = '00ulzdb18iCY1wMep5d6';
profiles[5].user_id = '00ulzfj6nX79gu0Nh5d6';
profiles[6].role_id = 3;
profiles[7].role_id = 3;
profiles[8].role_id = 3;
profiles[9].role_id = 4;
profiles[10].role_id = 4;
profiles[11].role_id = 4;

exports.seed = function (knex) {
  return knex('profiles')
    .del()
    .then(function () {
      return knex('profiles').insert(profiles);
    });
};
