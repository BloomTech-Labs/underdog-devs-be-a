const db = require('../../data/db-config');

const getSecret = () => {
  return db('getting_started');
};

module.exports = { getSecret };
