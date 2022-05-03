const axios = require('axios');
const config = require('../../config/auth0');
const Profiles = require('../profile/profileModel');

const authRequired = async (req, res, next) => {
  try {
    // Check if there's a token in the auth header
    const authHeader = req.headers.authorization || '';
    const tokenFormat = authHeader.match(/Bearer (.+)/);

    if (!tokenFormat) {
      next({
        status: 401,
        message: 'The token is incorrectly formatted',
      });
    }

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
            status: 401,
            message: 'Unable to process idToken',
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
