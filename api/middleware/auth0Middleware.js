const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const createError = require('http-errors');
const config = require('../../config/auth0');

// writing the config for expressJwt method to be invoked with product environment variables
const verifyJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.jwksUri,
  }),
  audience: config.audience,
  issuer: config.issuer,
  algorithms: ['RS256'],
  requestProperty: 'auth0User',
}).unless({ path: [`/application/new/mentor`, `/application/new/mentee`] });
//************ */
//in the above line add all public endpoints (routes with no need for auth) as a string inside the path array [] <=
// **** IMPORTANT note: if your public endpoint has descendent end points (ex.: ./yourRouterEndPoint/:user_id) you need ot use regex as in the following example:
// ({ path: ['/', /^\/<your router end point>\/.*/] }); => example: ({ path: ['/', /^\/application\/.*/, /^\/roles\/.*/] });
//************ */

//exporting the verifyjwt method as a middleware to be used in app.js server file against all routes except what is in the exception array in above method
const authRequired = (req, res, next) => {
  verifyJwt(req, res, next);
};

//method to grab the current authenticated user from the req.auth0User  and save it to req.body.user to be used globally in the server
const authProfile = async (req, res, next) => {
  try {
    const profile = await req.auth0User;
    if (profile) {
      req.body.profile = profile;
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = { authRequired, authProfile };
