const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

/*
  Author: Melody McClure
  The purpose of this middleware is to access the DS API endpoints for both mentors and mentees, then allow the routes calling them to filter the information based on the requested parameters from the front end.
  TODO: Currently every field of user info will be sent. If Release Managers or Stakeholder desire less, a simple filter or map will do the trick.
*/
const readAllUsers = async (req, res, next) => {
  try {
    const mentorData = await axios
      .post(`${baseURL}/read/mentor`, req.body)
      .then((results) => {
        const mentors = results.data.result;
        return mentors;
      });

    const menteeData = await axios
      .post(`${baseURL}/read/mentee`, req.body)
      .then((results) => {
        const mentees = results.data.result;
        return mentees;
      });

    const users = mentorData.concat(menteeData);
    req.info = users;
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = {
  readAllUsers,
};
