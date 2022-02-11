const okta = require('@okta/okta-sdk-nodejs');
const { config } = require('../../config/okta');

const client = new okta.Client({
  orgUrl: config.issuer,
  token: config.clientId,
});

function passGenerator() {
  let password = '';
  const str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
  for (let i = 1; i <= 8; i++) {
    const char = Math.floor(Math.random() * str.length + 1);
    password += str.charAt(char);
  }
  return password;
}

const registerOktaUser = async (req, res, next) => {
  const tempPassword = passGenerator();
  const newUser = {
    profile: {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      login: req.body.email,
    },
    credentials: {
      password: {
        // this must be made available to admins.
        // approved users should be prompted to rewrite this value.
        value: tempPassword,
      },
    },
  };

  try {
    const oktaUser = await client.createUser(newUser);
    req.user = oktaUser;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { registerOktaUser };
