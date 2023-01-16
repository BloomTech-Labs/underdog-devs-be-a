// delete this file once we are able to fully implement auth0 without jwt expired message

const authRequired = async (req, res, next) => {
  try {
    const fakeProfile = {
      first_name: 'Test',
      last_name: 'Test',
      role_id: 1,
      profile_id: '00ulthapbErVUwVJy4x6',
    };

    // Verify that the token is valid
    const profile = fakeProfile;

    if (profile) {
      req.profile = profile;
    } else {
      next({
        status: 401,
        message: 'Unable to process idToken',
      });
    }

    // Proceed with request if token is valid
    next();
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = authRequired;
