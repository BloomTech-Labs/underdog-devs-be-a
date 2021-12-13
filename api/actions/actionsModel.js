const db = require('../../data/db-config');

const findAll = () => {
  return db('action_tickets');
};

const findBy = (filter) => {
  return db('action_tickets').where(filter);
};

const findById = async (action_ticket_id) => {
  return db('action_tickets').where({ action_ticket_id }).first().select('*');
};

const create = async (actions) => {
  return db('action_tickets').insert(actions).returning('*');
};

const update = (id, actions) => {
  return db('action_tickets')
    .where({ action_ticket_id: id })
    .first()
    .update(actions)
    .returning('*');
};

const remove = async (id) => {
  return await db('action_tickets').where({ id }).del();
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
