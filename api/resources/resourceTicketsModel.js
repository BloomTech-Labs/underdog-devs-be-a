//Todo: Refactor these function to be fetching data from tickets table instead of resource-tickets table
const db = require('../../data/db-config');

const findAll = async () => {
  let result = await db('tickets');
  return result;
};

module.exports = {
  findAll,
};
