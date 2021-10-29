const dummyData = [
  {
    submitted_by: '7',
    recipient: '10',
    reason: "William's house burned down, can he get a laptop cause why not?",
  },
  {
    submitted_by: '11',
    recipient: '11',
    reason: "I hear y'all are giving away laptops?",
  },
  {
    submitted_by: '12',
    recipient: '12',
    reason: 'Could I get a textbook to help my studies?',
  },
  {
    submitted_by: '8',
    recipient: '12',
    reason:
      'I received a laptop from you guys and its not turning on :( any chance I can get a new one? I will send this one back.',
  },
];

exports.seed = function (knex) {
  return knex('tech_tickets')
    .del()
    .then(function () {
      return knex('tech_tickets').insert(dummyData);
    });
};
