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

const updateUser = async (req, res, next) => {
  const { profile_id } = req.body;

  try {
    const mentorData = await axios
      .post(`${baseURL}/update/mentor`, profile_id)
      .then((results) => {
        const mentorInfo = results.data.result.map((mentor) => {
          const data = {
            name: `${mentor.first_name} ${mentor.last_name}`,
            city: mentor.city,
            state: mentor.state,
          };
          return data;
        });
        return mentorInfo;
      });

    const menteeData = await axios
      .post(`${baseURL}/update/mentee`, profile_id)
      .then((results) => {
        const menteeInfo = results.data.result.map((mentee) => {
          const data = {
            name: `${mentee.first_name} ${mentee.last_name}`,
            city: mentee.city,
            state: mentee.state,
          };
          return data;
        });
        return menteeInfo;
      });

    const users = mentorData.concat(menteeData);
    res.send({ users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readAllUsers,
  updateUser,
};
