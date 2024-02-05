const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {};

if (ENV === 'production') {
  // For production, use DATABASE_URL and set a max pool size
  config.connectionString = process.env.DATABASE_URL;
  // Limiting the pool size to 2 to leave connections available for manual operations
  config.max = 2;
} else {
  // For non-production environments, no additional config is required here,
  // assuming PGDATABASE and other necessary env vars are set.
  // You might still configure other aspects like max pool size based on your development or test DB.
}

module.exports = new Pool();
