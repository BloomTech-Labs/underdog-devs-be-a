const axios = require('axios');
const DSURL = process.env.DS_API_URL;

const sendData = (applicationData, role) => {
  axios
    .post(`${DSURL}/${role}/create`, applicationData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = sendData;
