const crypto = require('crypto');

const generatePassword = (length) => {
  let password = createPassword(length);
  while (checkRegex(password) === false) {
    password = createPassword(length);
  }
  return password;
};

const createPassword = (length) => {
  const allChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_?';

  let password = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => allChars[x % allChars.length])
    .join('');
  return password;
};

const checkRegex = (password) => {
  let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])');
  if (regex.test(password)) return true;
  else return false;
};

module.exports = { generatePassword };
