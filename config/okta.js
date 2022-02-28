module.exports = {
  expectedAudience: ['api://default', `${process.env.OKTA_CLIENT_ID}`],
  config: {
    issuer: `${process.env.OKTA_URL_ISSUER}`,
    orgUrl: `${process.env.OKTA_ORG_URL}`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    devToken: `${process.env.OKTA_DEVELOPER_TOKEN}`,
    assertClaims: {
      aud: `${process.env.OKTA_CLIENT_ID}`,
    },
  },
};
