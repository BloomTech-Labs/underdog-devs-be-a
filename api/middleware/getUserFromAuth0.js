const axios = require('axios');
const config = require('../../config/auth0');

const getUserAuth0 = async (req, res, next) => {
  try {
    // Check if there's a token in the auth header
    const authHeader = req.headers.authorization || '';
    const token = authHeader.match(/Bearer (.+)/);
    if (!token) {
      next({
        status: 401,
        message: 'Missing Token',
      });
    }
    // Check against Auth0 if token is valid and grab user data
    await axios
      .get(`${config.issuer}/userinfo`, {
        headers: {
          authorization: authHeader,
        },
      })
      .then((res) => {
        const profile = res.data;
        req.profile = profile;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: err,
        });
      });
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = { getUserAuth0 };
