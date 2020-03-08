const BreedsTable = require('./tables/breeds-table');
const DogsTable = require('./tables/dogs-table');
const OwnersTable = require('./tables/owners-table');
const buildOwnersRoutes = require('./routers/owners-router');
const buildBreedsRoutes = require('./routers/breeds-router');

function setupApp(app, db) {
  // DB Tables
  const breeds = new BreedsTable(db);
  const dogs = new DogsTable(db);
  const owners = new OwnersTable(db);

  app.use('/owners', buildOwnersRoutes(owners));
  app.use('/breeds', buildBreedsRoutes(breeds));

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
