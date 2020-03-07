/* eslint-disable no-console */
const Table = require('cli-table');

// Based on:
// https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express
function printRoutes(baseUrl, routes) {
  const table = new Table({ head: ['', 'Path'] });
  console.log(`\nAPI for ${baseUrl}`);
  console.log('\n********************************************');

  Object.values(routes)
    .map(routeWrapper => routeWrapper.route)
    .filter(route => route)
    .forEach(route => {
      table.push({
        [route.stack[0].method]: [baseUrl + route.path]
      });
    });

  console.log(table.toString());
  return table;
}

module.exports = { printRoutes };
