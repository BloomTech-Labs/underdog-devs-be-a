const db = require('../../data/db-config');

const findAll = async () => {
  return await db('resources');
};

const findByResourceId = async (resource_id) => {
  return db.select('*').from('resources').where({ resource_id }).first();
};

const Create = async (newResource) => {
  const [resource] = await db('resources')
    .insert(newResource)
    .returning([
      'resource_id',
      'resource_name',
      'category',
      'condition',
      'created_at',
      'updated_at',
      'assigned',
      'current_assignee',
      'previous_assignee',
      'monetary_value',
      'deductible_donation',
    ]);
  return resource;
};

const Update = async (resource_id, changes) => {
  const [resource] = await db('resources')
    .where({ resource_id })
    .update(changes)
    .returning([
      'resource_id',
      'resource_name',
      'category',
      'condition',
      'created_at',
      'updated_at',
      'assigned',
      'current_assignee',
      'previous_assignee',
      'monetary_value',
      'deductible_donation',
    ]);
  return resource;
};

const Delete = async (resource_id) => {
  return db('resources').where({ resource_id }).del();
};

module.exports = { findAll, findByResourceId, Create, Update, Delete };
