const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const config = require('../../config/auth0');

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.jwksUri,
  }),
  audience: config.audience,
  issuer: config.issuer,
  algorithms: ['RS256'],
});

module.exports = { verifyJwt };
