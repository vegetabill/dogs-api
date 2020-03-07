const express = require('express');
const morgan = require('morgan');
const { printRoutes } = require('./src/utils');
const BreedsTable = require('./src/breeds-table');

const DEFAULT_DB_NAME = 'dogs-dev';
const DB_NAME = process.env.DB_NAME || DEFAULT_DB_NAME;
const pgp = require('pg-promise')();
const db = pgp(`postgres://postgres@localhost:5432/${DB_NAME}`);

const breeds = new BreedsTable(db);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(morgan('dev'));

app.route('/breeds').get((req, res) => {
  breeds.all().then(data => res.send(data));
});

// Test the DB connection before starting the server
breeds.sanityCheck().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  printRoutes(`http://localhost:${PORT}`, app._router.stack);
});
