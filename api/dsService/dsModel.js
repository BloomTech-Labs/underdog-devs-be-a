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

module.exports = { getPrediction, getViz, postMeeting };
