const axios = require('axios');
const config = require('../../config/auth0');

const getUserAuth0 = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const response = await axios.get(`${config.issuer}/userinfo`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const profile = response.data;
    req.profile = profile;
    next();
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = { getUserAuth0 };
