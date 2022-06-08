const randomLocations = [
  'Guthrie, Oklahoma',
  'Seattle, Washington',
  'Dallas, Texas',
  'Sedona, Arizona',
  'Raleigh, North Carolina',
];
const tech_stack = [
  'React',
  'Vue',
  'Angular',
  'Node',
  'FastAPI',
  'TypeScript',
  'Go',
  'C#',
  'noSQL',
  'sqlchad',
];

const profiles = [...new Array(14)].map((i, idx) => ({
  profile_id: (idx + 1).toString(),
  email: `llama00${idx + 1}@maildrop.cc`,
  first_name: idx < 2 ? `Admin` : idx == 2 ? `Moderator` : `User`,
  last_name: idx < 2 ? `${idx + 1}` : `${idx + 1}`,
  company: idx < 2 ? 'UnderDogDevs' : idx === 2 ? 'BloomTech' : 'Unemployed',
  location: randomLocations[Math.floor(Math.random() * 5)],
  tech_stack: [
    `${tech_stack[Math.floor(Math.random() * 9)]}`,
    `${tech_stack[Math.floor(Math.random() * 9)]}`,
  ],
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

profiles[7].progress_id = 3;
profiles[9].progress_id = 4;
profiles[10].progress_id = 5;

exports.seed = function (knex) {
  return knex('profiles')
    .del()
    .then(function () {
      return knex('profiles').insert(profiles);
    });
};

exports.profiles = { profiles };
