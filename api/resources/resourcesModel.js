const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resources');
};

module.exports = { findAll };
