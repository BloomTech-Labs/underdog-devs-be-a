const axios = require('axios');
const getUserFromAuth0 = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const response = await axios.get('https://mypad.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = response.data;
    req.userInfo = userInfo;
    next();
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = { getUserFromAuth0 };
