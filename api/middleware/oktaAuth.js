const okta = require('@okta/okta-sdk-nodejs');
const { config } = require('../../config/okta');

const client = new okta.Client({
  orgUrl: config.orgUrl,
  token: config.devToken,
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
      firstName: req.profile.first_name,
      lastName: req.profile.last_name,
      email: req.profile.email,
      login: req.profile.email,
    },
    credentials: {
      password: {
        value: tempPassword,
      },
    },
  };

  client
    .createUser(newUser)
    .then((oktaResponse) => {
      req.tempPassword = tempPassword;
      req.oktaResponse = oktaResponse;
      next();
    })
    .catch((err) => {
      console.error(err);
      return next({ status: 404, stack: err.stack, message: err.message });
    });
};

module.exports = { registerOktaUser };
