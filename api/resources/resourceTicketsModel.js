const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resource_tickets');
};

module.exports = { findAll };
