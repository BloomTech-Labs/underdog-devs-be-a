const db = require('../../data/db-config');

const findAll = async () => {
  return await db('account_tickets');
};

const findBy = (filter) => {
  return db('account_tickets').where(filter);
};

const findById = async (submitted_by) => {
  return db('account_tickets').where({ submitted_by }).first().select('*');
};

const create = async (actions) => {
  return db('account_tickets').insert(actions).returning('*');
};

const update = (id, actions) => {
  console.log(actions);
  return db('account_tickets')
    .where({ submitted_by: id })
    .first()
    .update(actions)
    .returning('*');
};

const remove = async (id) => {
  return await db('account_tickets').where({ id }).del();
};

const findOrCreateActions = async (actionsObj) => {
  const foundActions = await findById(actionsObj.id).then((actions) => actions);
  if (foundActions) {
    return foundActions;
  } else {
    return await create(actionsObj).then((newActions) => {
      return newActions ? newActions[0] : newActions;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateActions,
};
