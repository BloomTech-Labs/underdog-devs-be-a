const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resources');
};

const findByResourceId = async (resource_id) => {
  return db.select('*').from('resources').where({ resource_id }).first();
};

module.exports = { findAll, findByResourceId };
