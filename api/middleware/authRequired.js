const axios = require('axios');
const config = require('../../config/auth0');
const Profiles = require('../profile/profileModel');

const authRequired = async (req, res, next) => {
  try {
    // Check if there's a token in the auth header
    const authHeader = req.headers.authorization || '';

    // Check if the token matches our format
    const tokenFormat = authHeader.match(/Bearer (.+)/);
    if (!tokenFormat) {
      next({
        status: 401,
        message: 'The token is incorrectly formatted',
      });
    }

    // Build the profile object to match DB columns
    // Important to note that when a user register/login without google
    // They do not have the first_name or last_name obj
    // But regardless, every user will always have a sub and a email
    const createProfileObj = (user) => {
      return {
        profile_id: user.sub,
        email: user.email,
      };
    };

    // Check against Auth0 if token is valid and grab user data
    await axios
      .get(`${config.issuer}userinfo`, {
        headers: {
          authorization: authHeader,
        },
      })
      .then((user) => {
        // If user exists, they hold a valid jwt, then we find/create their profile
        if (user.data) {
          const obj = createProfileObj(user.data);
          Profiles.findOrCreateProfile(obj)
            .then((profile) => {
              req.profile = profile;
              next();
            })
            .catch((err) => {
              next({
                status: 500,
                message: err,
              });
            });
        } else {
          next({
            status: 404,
            message: 'User object cannot be found',
          });
        }
      })
      .catch((err) => {
        next({
          status: err.status,
          message: err.message,
        });
      });
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = authRequired;
