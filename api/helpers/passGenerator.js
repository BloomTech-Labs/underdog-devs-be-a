function passGenerator() {
  let password = '';
  const str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!%^&*()';
  for (let i = 0; i < 7; i++) {
    const randNum = Math.floor(Math.random() * str.length);
    password += str.charAt(randNum);
  }
  return password;
}

module.exports = { passGenerator };
