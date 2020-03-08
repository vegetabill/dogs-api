/* eslint-disable no-console */
// 3p packages
const express = require('express');
const morgan = require('morgan');
const pgp = require('pg-promise')();

// files in this repo
const { printRoutes, camelize } = require('./src/utils');
const { createNotAllowedHandler } = require('./src/response-utils');
const BreedsTable = require('./src/breeds-table');
const DogsTable = require('./src/dogs-table');

// Config
const DEFAULT_DB_NAME = 'dogs-dev';
const DB_NAME = process.env.DB_NAME || DEFAULT_DB_NAME;
const connectionString = `postgres://postgres@localhost:5432/${DB_NAME}`;
const db = pgp(connectionString);

// DB Tables
const breeds = new BreedsTable(db);
const dogs = new DogsTable(db);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(morgan('dev'));

const sendData = (res, data) => {
  res.send(camelize(data));
};

app.route('/dogs').get((req, res) => {
  dogs.all().then(data => sendData(res, data));
});

app
  .route('/breeds')
  .get((req, res) => {
    breeds.all().then(data => sendData(res, data));
  })
  // We'll just consider breeds an immutable list for now
  // So any non-GET is 405
  .post(createNotAllowedHandler())
  .put(createNotAllowedHandler())
  .delete(createNotAllowedHandler());

// Test the DB connection before starting the server
console.log('DB connectionString => ', connectionString);

breeds.sanityCheck().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  // eslint-disable-next-line no-underscore-dangle
  printRoutes(`http://localhost:${PORT}`, app._router.stack);
});
