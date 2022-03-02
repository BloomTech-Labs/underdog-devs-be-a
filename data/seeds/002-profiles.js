const profiles = [...new Array(14)].map((i, idx) => ({
  profile_id: (idx + 1).toString(),
  email: `llama00${idx + 1}@maildrop.cc`,
  first_name: idx < 2 ? `Admin` : idx == 2 ? `Moderator` : `User`,
  last_name: idx < 2 ? `${idx + 1}` : `${idx + 1}`,
  role_id: idx < 2 ? 1 : idx == 2 ? 2 : 3,
  is_active: true,
  progress_id: null,
}));

profiles[0].profile_id = '00ulthapbErVUwVJy4x6';
profiles[1].profile_id = '00ultwew80Onb2vOT4x6';
profiles[2].profile_id = '00ultx74kMUmEW8054x6';
profiles[3].profile_id = '00ultwqjtqt4VCcS24x6';
profiles[4].profile_id = '00ultwz1n9ORpNFc04x6';
profiles[5].profile_id = '00u13omswyZM1xVya4x7';
profiles[7].profile_id = '00u13oned0U8XP8Mb4x7';
profiles[12].profile_id = 'BH6hr755W188LA6e';
profiles[13].profile_id = 'l46VW1FXE2lM1610';

profiles[4].role_id = 5;
profiles[6].role_id = 3;
profiles[7].role_id = 4;
profiles[8].role_id = 3;
profiles[9].role_id = 4;
profiles[10].role_id = 4;
profiles[11].role_id = 5;
profiles[12].role_id = 2;
profiles[13].role_id = 2;

profiles[7].progress_id = 3;
profiles[9].progress_id = 4;
profiles[10].progress_id = 5;

exports.profileList = [
  {
    email: 'llama001@maildrop.cc',
    first_name: 'Admin',
    is_active: true,
    last_name: '1',
    profile_id: '00ulthapbErVUwVJy4x6',
    progress_id: null,
    progress_status: null,
    role_id: 1,
  },
  {
    email: 'llama002@maildrop.cc',
    first_name: 'Admin',
    is_active: true,
    last_name: '2',
    profile_id: '00ultwew80Onb2vOT4x6',
    progress_id: null,
    progress_status: null,
    role_id: 1,
  },
  {
    email: 'llama003@maildrop.cc',
    first_name: 'Moderator',
    is_active: true,
    last_name: '3',
    profile_id: '00ultx74kMUmEW8054x6',
    progress_id: null,
    progress_status: null,
    role_id: 2,
  },
  {
    email: 'llama004@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '4',
    profile_id: '00ultwqjtqt4VCcS24x6',
    progress_id: null,
    progress_status: null,
    role_id: 3,
  },
  {
    email: 'llama005@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '5',
    profile_id: '00ultwz1n9ORpNFc04x6',
    progress_id: null,
    progress_status: null,
    role_id: 5,
  },
  {
    email: 'llama006@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '6',
    profile_id: '00u13omswyZM1xVya4x7',
    progress_id: null,
    progress_status: null,
    role_id: 3,
  },
  {
    email: 'llama007@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '7',
    profile_id: '7',
    progress_id: null,
    progress_status: null,
    role_id: 3,
  },
  {
    email: 'llama008@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '8',
    profile_id: '00u13oned0U8XP8Mb4x7',
    progress_id: 3,
    progress_status: null,
    role_id: 4,
  },
  {
    email: 'llama009@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '9',
    profile_id: '9',
    progress_id: null,
    progress_status: null,
    role_id: 3,
  },
  {
    email: 'llama0010@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '10',
    profile_id: '10',
    progress_id: 4,
    progress_status: null,
    role_id: 4,
  },
  {
    email: 'llama0011@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '11',
    profile_id: '11',
    progress_id: 5,
    progress_status: null,
    role_id: 4,
  },
  {
    email: 'llama0012@maildrop.cc',
    first_name: 'User',
    is_active: true,
    last_name: '12',
    profile_id: '12',
    progress_id: null,
    progress_status: null,
    role_id: 5,
  },
  {
    email: 'mentortest1@maildrop.cc',
    first_name: 'MentorTest',
    is_active: true,
    last_name: '1',
    profile_id: 'l46VW1FXE2lM1610',
    progress_id: null,
    progress_status: null,
    role_id: 2,
  },
  {
    email: 'mentortest2@Maildrop.cc',
    first_name: 'MentorTest',
    is_active: true,
    last_name: '2',
    profile_id: 'BH6hr755W188LA6e',
    progress_id: null,
    progress_status: null,
    role_id: 2,
  },
];

exports.seed = function (knex) {
  return knex('profiles')
    .del()
    .then(function () {
      return knex('profiles').insert(profiles);
    });
};
