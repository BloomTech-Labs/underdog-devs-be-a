module.exports = {
  jwksUri: process.env.AUTH0_JWKS_URI,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  connection: process.env.AUTH0_CONNECTION,
  token: process.env.AUTH0_TOKEN,
};
