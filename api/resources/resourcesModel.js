const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resources');
};

const findByResourceId = async (resource_id) => {
  return db.select('*').from('resources').where({ resource_id }).first();
};

const findBy = async (filter) => {
  return db.from('resources').where(filter);
};

const Create = async (newResource) => {
  const resource = await db('resources').insert(newResource);
  return resource;
};

const Update = async (resource_id, changes) => {
  return db('resources').where({ resource_id }).update(changes);
};

const Delete = async (resource_id) => {
  return db('resources').where({ resource_id }).del();
};

module.exports = { findAll, findByResourceId, findBy, Create, Update, Delete };
