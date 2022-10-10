function passGenerator() {
  let password = '';
  const chars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    'abcdefghijklmnopqrstuvwxyz',
    '!@#$%^&*()',
  ];
  for (let i = 0; i < 4; i++) {
    const randNum1 = Math.floor(Math.random() * chars[i].length);
    const randNum2 = Math.floor(Math.random() * chars[i].length);
    password += chars[i].charAt(randNum1);
    password += chars[i].charAt(randNum2);
  }
  return password;
}

module.exports = { passGenerator };
