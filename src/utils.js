/* eslint-disable no-console */
const Table = require('cli-table');
const camelCase = require('lodash/camelCase');
const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const isArrayLikeObject = require('lodash/isArrayLikeObject');
const isObject = require('lodash/isObject');

// Based on:
// https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express
function printRoutes(baseUrl, routes) {
  const table = new Table({ head: ['Verb', 'Path'] });
  console.log(`\nAPI for ${baseUrl}`);
  console.log('\n********************************************');

  Object.values(routes)
    .map(routeWrapper => routeWrapper.route)
    .filter(route => route)
    .forEach(route => {
      table.push({
        [route.stack[0].method.toUpperCase()]: [baseUrl + route.path]
      });
    });

  console.log(table.toString());
  return table;
}

/**
 * Recursively camelize the keys of an object
 * @param {} object
 */
function camelize(object) {
  if (isArrayLikeObject(object)) {
    return object.map(camelize);
  }
  const camelKeyed = mapKeys(object, (v, k) => camelCase(k));
  return mapValues(camelKeyed, v => (isObject(v) ? camelize(v) : v));
}

module.exports = { printRoutes, camelize };
