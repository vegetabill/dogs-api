/* eslint-disable no-console */
// npm packages
const express = require('express');
const morgan = require('morgan');
const pgp = require('pg-promise')();
const pretty = require('express-prettify');

// project modules
const { setupApp } = require('./src/app');
const { printRoutes } = require('./src/utils');

// Config
const DEFAULT_DB_NAME = 'dogs-dev';
const DB_NAME = process.env.DB_NAME || DEFAULT_DB_NAME;
const connectionString = `postgres://postgres@localhost:5432/${DB_NAME}`;
const db = pgp(connectionString);
console.log('Postgres DB => ', connectionString);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

// Middlewares
const app = express();
app.use(morgan('dev'));
// add ?pretty to any query to get pretty json
app.use(pretty({ query: 'pretty' }));

setupApp(app, db).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  // eslint-disable-next-line no-underscore-dangle
  printRoutes(`http://localhost:${PORT}`, app._router.stack);
});
