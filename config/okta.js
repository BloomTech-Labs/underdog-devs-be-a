module.exports = {
  expectedAudience: ['api://default', `${process.env.OKTA_CLIENT_ID}`],
  config: {
    issuer: `${process.env.OKTA_URL_ISSUER}`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    assertClaims: {
      aud: `${process.env.OKTA_CLIENT_ID}`,
    },
  },
};
