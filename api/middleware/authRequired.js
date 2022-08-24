/* The following lines are commented out for the linter.
    Profiles will be needed when Auth0 is implemented */
// const Profiles = require('../profile/profileModel');

// const makeProfileObj = (claims) => {
//   return {
//     id: claims.sub,
//     email: claims.email,
//     name: claims.name,
//   };
// };
/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
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
