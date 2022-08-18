const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

const readAllUsers = async (req, res, next) => {
  try {
    const mentorData = await axios
      .post(`${baseURL}/read/mentor`)
      .then((results) => {
        const mentors = results.data.result.map((mentor) => mentor);
        return mentors;
      });

    const menteeData = await axios
      .post(`${baseURL}/read/mentee`)
      .then((results) => {
        const mentees = results.data.result.map((mentee) => mentee);
        return mentees;
      });

    const users = mentorData.concat(menteeData);

    res.send({ users });
  } catch (err) {
    next(err);
  }
};

module.exports = { readAllUsers };
