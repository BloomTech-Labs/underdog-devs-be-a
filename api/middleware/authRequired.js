const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const Profiles = require('../profile/profileModel');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const makeProfileObj = (claims) => {
  return {
    id: claims.sub,
    email: claims.email,
    name: claims.name,
  };
};
/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authRequired = async (req, res, next) => {
  try {
    // Check if there's a token in the auth header
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
      return next({
        status: 401,
        message: 'Missing idToken',
      });
    }

    // Verify that the token is valid
    const idToken = match[1];
    const oktaData = await oktaJwtVerifier.verifyAccessToken(
      idToken,
      oktaVerifierConfig.expectedAudience
    );
    const jwtUserObj = makeProfileObj(oktaData.claims);
    const profile = await Profiles.findOrCreateProfile(jwtUserObj);
    if (profile) {
      req.profile = profile;
    } else {
      return next({
        status: 401,
        message: 'Unable to process idToken',
      });
    }

    // Proceed with request if token is valid
    return next();
  } catch (err) {
    return next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = authRequired;
