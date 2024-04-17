const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
const fs = require('fs');

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}
const config = {
  max: 10,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,
};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
module.exports = new Pool(config);
