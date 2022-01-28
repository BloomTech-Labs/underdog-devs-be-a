const okta = require('@okta/okta-sdk-nodejs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const client = new okta.Client({
  orgUrl: process.env.OKTA_REGISTRATION_URL,
  token: process.env.OKTA_REGISTRATION_TOKEN,
});

function passGenerator() {
  var password = '';
  var str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
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

  await client.createUser(newUser).then((user) => {
    console.log('Created user', user);
    next();
  });
};

module.exports = { registerOktaUser };
