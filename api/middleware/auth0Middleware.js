const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const createError = require('http-errors');
const config = require('../../config/auth0');
// const { findOrCreateProfile } = require('../profile/profileModel');

// const makeProfileObj = (claims) => {
//   return {
//     id: claims.sub.slice(6),
//     email: claims.email,
//     name: claims.name,
//   };
// };

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
}).unless({ path: ['/'] });
//************ */
//in the above line add all public endpoints (routes with no need for auth) as a string inside the path array [] <=
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
      //----------------
      // below code was used with okta to create user profile and save it to the db, when I tried to use it with auth0 I receive error message:
      //"insert into \"profiles\" (\"email\", \"id\", \"name\") values ($1, $2, $3) returning * - column \"email\" of relation \"profiles\" does not exist"

      // const jwtUserObj = makeProfileObj(user);
      // console.log(jwtUserObj.id);
      // const profile = await findOrCreateProfile(jwtUserObj);
      // if (profile) {
      //   req.body.profile = profile;
      //   // console.log('profile', profile);
      // } else {
      //   throw new Error('Unable to process jwt profile');
      // }
      //----------------
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = { authRequired, authProfile };
