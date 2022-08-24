const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');


/*
  Author: Melody McClure
  The purpose of this middleware is to access the DS API endpoints for both mentors and mentees, then allow the routes calling them to filter the information based on the requested parameters from the front end.
  TODO: Currently there is an empty map in place, so every field of user info will be sent. It probably needs to be decided by the Release Managers or Stakeholder what should be returned here and what should not be accessible.
*/
const readAllUsers = async (req, res, next) => {

  try {
    const mentorData = await axios
      .post(`${baseURL}/read/mentor`, req.body)
      .then((results) => {
        const mentors = results.data.result.map((mentor) => mentor);
        /*
        This code block is a represenation of the data object that can be implemented to limit the data returned to the routes.
         const data = {
             first_name: mentor.first_name,
             last_name: mentor.last_name,
             city: mentor.city,
             state: mentor.state,
           };
           return data;
         }
        */
        return mentors;
      });

      const menteeData = await axios
      .post(`${baseURL}/read/mentee`, req.body)
      .then((results) => {
        const mentees = results.data.result.map((mentee) => mentee);
        /*
        This code block is a represenation of the data object that can be implemented to limit the data returned to the routes.
         const data = {
             first_name: mentor.first_name,
             last_name: mentor.last_name,
             city: mentor.city,
             state: mentor.state,
           };
           return data;
         }
        */
        return mentees;
      });

      const users = mentorData.concat(menteeData);
      req.info = users
      res.json({ users });
    } catch (err) {
      next(err);
    }
    next()
  };

  /*
    Author: Melody McClure
    ***THIS ROUTE REACHES THE UPDATE ENDPOINT AND WILL CAUSE CHANGES TO THE DS API***
    The purpose of this middleware is to access the DS API endpoints for both mentors and mentees, then allow the routes calling them to filter the information based on the requested parameters from the front end.
    TODO: Currently there is an empty map in place, so every field of user info will be sent. It probably needs to be decided by the Release Managers or Stakeholder what should be returned here and what should not be accessible.
  */

  const updateUser = async (req, res, next) => {
    const { profile_id } = req.body;

    try {
      const mentorData = await axios
      .post(`${baseURL}/update/mentor`, profile_id)
      .then((results) => {
        const mentorInfo = results.data.result.map(mentor => mentor);
        /*
        This code block is a represenation of the data object that can be implemented to limit the data returned to the routes.
         const data = {
             first_name: mentee.first_name,
             last_name: mentee.last_name,
             city: mentee.city,
             state: mentee.state,
           };
           return data;
         }
        */
        return mentorInfo;
      });

      const menteeData = await axios
      .post(`${baseURL}/update/mentee`, profile_id)
      .then((results) => {
        const menteeInfo = results.data.result.map(mentee => mentee);
        /*
        This code block is a represenation of the data object that can be implemented to limit the data returned to the routes.
         const data = {
             first_name: mentee.first_name,
             last_name: mentee.last_name,
             city: mentee.city,
             state: mentee.state,
           };
           return data;
         }
        */
        return menteeInfo;
      });

      const users = mentorData.concat(menteeData);
      req.info = users
      res.send({ users });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    readAllUsers,
    updateUser,
  };
