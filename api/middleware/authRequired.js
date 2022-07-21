/**
 * @author Khaleel Musleh
 * @constant Imported jsonwebtoken import for Auth0 and removed @okta/jwt-verifier package import
 */
const Auth0Verifier = require('jsonwebtoken');
/**
 * @author Khaleel Musleh
 * @constant Removed const oktaVerifierConfig = require('../../config/okta');
 * @constant Added const AuthVerifierConfig = require('../helpers/auth0') importing credentials and secrets from helpers/auth0
 */
const AuthVerifierConfig = require('../helpers/auth0');
const Profiles = require('../profile/profileModel');

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
      next({
        status: 401,
        message: 'Missing idToken',
      });
    }

    /**
     *  @author Khaleel Musleh
     * @abstract Changed from Okta to Auth0
     * Substituted: 
    //const oktaData = await oktaJwtVerifier.verify(
    //   idToken,
    //   AuthVerifierConfig.audience
    // );

     TO:

    //    const authData = Auth0Verifier.verify(
    // idToken,
    //  AuthVerifierConfig.verifyJwt.secret,
    //  { audience: AuthVerifierConfig.verifyJwt.audience }
    //);

    Basically Verifies the token with idToken, AuthVerifierConfig.verifyJwt.secret taken from the auth0 helpers and { audience: AuthVerifierConfig.verifyJwt.audience }.
     *
     */

    // Verify that the token is valid
    const idToken = match[1];

    const authData = Auth0Verifier.verify(
      idToken,
      AuthVerifierConfig.verifyJwt.secret,
      { audience: AuthVerifierConfig.verifyJwt.audience }
    );
    const jwtUserObj = makeProfileObj(authData.claims);
    const profile = await Profiles.findOrCreateProfile(jwtUserObj);
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
