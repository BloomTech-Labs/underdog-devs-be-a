const axios = require('axios');
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);

const getPrediction = (x1, x2, x3) => {
  return dsClient.post('/predict', { x1, x2, x3 });
};

const getViz = (state) => {
  return dsClient.get(`/viz/${state}`);
};

const postMeeting = (meeting) => {
  return dsClient.post(`/Meetings/create`, meeting);
};

/*
//update meeting needs to be verified with DS... This may or may not work, but currently it can't be tested...
//for now, we will just update the local db
const updateMeeting = (meeting, id) => {
  return dsClient.update(`/Meetings/${id}`, meeting);
};


//update meedings needs to be verified with DS... This may or may not work, but currently it can't be tested...
//for now, we will just delete from the local db
const deleteMeeting = (id) => {
  return dsClient.delete(`/Meetings/${id}`);
};

*/

function postProfileUpdate(update, role_id) {
  const isMentor = role_id <= 3 ? 'Mentors' : 'Mentees';
  const name = `${update.first_name} ${update.last_name}`;

  const request = {
    email: update.email,
    name: name,
    location: update.location,
    company: update.company,
    subject: update.subject,
    attendance_rate: update.attendance_rate,
  };
  return dsClient.post(`/${isMentor}/update`, request);
}

module.exports = { getPrediction, getViz, postMeeting, postProfileUpdate };
