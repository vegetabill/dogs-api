/* eslint-disable no-console */
// 3p packages
const express = require('express');
const morgan = require('morgan');
const pgp = require('pg-promise')();

// files in this repo
const { printRoutes } = require('./src/utils');
const BreedsTable = require('./src/breeds-table');

// Config
const DEFAULT_DB_NAME = 'dogs-dev';
const DB_NAME = process.env.DB_NAME || DEFAULT_DB_NAME;
const connectionString = `postgres://postgres@localhost:5432/${DB_NAME}`;
const db = pgp(connectionString);

const breeds = new BreedsTable(db);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(morgan('dev'));

app.route('/breeds').get((req, res) => {
  breeds.all().then(data => res.send(data));
});

// Test the DB connection before starting the server
console.log('DB connectionString => ', connectionString);

breeds.sanityCheck().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  // eslint-disable-next-line no-underscore-dangle
  printRoutes(`http://localhost:${PORT}`, app._router.stack);
});
