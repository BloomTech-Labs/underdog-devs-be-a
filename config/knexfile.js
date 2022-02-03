const path = require('path');
var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const sharedConfig = {
  client: 'pg',
  migrations: { directory: path.join(__dirname, '../data/migrations') },
  seeds: { directory: path.join(__dirname, '../data/seeds') },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },

  production: {
    ...sharedConfig,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
  },
};
