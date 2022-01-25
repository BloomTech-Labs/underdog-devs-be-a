const dummyData = [
    {
      submitted_by: '2',
      subject_id: '1',
      requested_role: '3',
      approved_by: '3',
      comments: 'This is my 1st dummy data comment',
      pending: true,
      resolved: false,
    },
    {
      submitted_by: '3',
      subject_id: '2',
      requested_role: '4',
      approved_by: '4',
      comments: 'This is my 2nd dummy data comment',
      pending: true,
      resolved: false,
    },
   
  ];
  
  exports.seed = function (knex) {
    return knex('role_tickets')
      .del()
      .then(function () {
        return knex('role_tickets').insert(dummyData);
      });
  };
  