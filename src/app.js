const { camelize } = require('./utils');
const { createNotAllowedHandler } = require('./response-utils');
const BreedsTable = require('./breeds-table');
const DogsTable = require('./dogs-table');
const OwnersTable = require('./owners-table');

function setupApp(app, db) {
  // DB Tables
  const breeds = new BreedsTable(db);
  const dogs = new DogsTable(db);
  const owners = new OwnersTable(db);

  const sendData = (res, data) => {
    res.send(camelize(data));
  };

  app.route('/owners').get((req, res) => {
    owners.all().then(data => sendData(res, data));
  });

  app.route('/dogs').get((req, res) => {
    dogs.all().then(data => sendData(res, data));
  });

  app
    .route('/breeds')
    .get((_, res) => {
      breeds.all().then(data => sendData(res, data));
    })
    // We'll just consider breeds an immutable list for now
    // So any non-GET is 405
    .post(createNotAllowedHandler())
    .put(createNotAllowedHandler())
    .delete(createNotAllowedHandler());

  return new Promise((resolve, reject) => {
    return Promise.all([breeds.sanityCheck(), dogs.sanityCheck(), owners.sanityCheck()])
      .then(() => {
        resolve(true);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('unable to connect to database. see README for troubleshooting');
        reject(e);
      });
  });
}

module.exports = { setupApp };
