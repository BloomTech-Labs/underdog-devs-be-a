const dummyData = [
  {
    resource_name: 'Macbook Pro 2020',
    category: 'Computers',
    condition: 'Excellent',
    assigned: true,
    current_assignee: '9',
    previous_assignee: '7',
    monetary_value: '1000$',
    deductible_donation: true,
  },
  {
    resource_name: 'Computer Desk',
    category: 'Office Supplies',
    condition: 'Great',
    assigned: false,
    previous_assignee: '7',
    monetary_value: '200$',
    deductible_donation: true,
  },
  {
    resource_name: 'Computer Monitor',
    category: 'Electronics',
    condition: 'Good',
    assigned: false,
    monetary_value: '100$',
    deductible_donation: true,
  },
];

exports.seed = function (knex) {
  return knex('resources')
    .del()
    .then(function () {
      return knex('resources').insert(dummyData);
    });
};
