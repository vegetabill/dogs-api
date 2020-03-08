/* eslint-disable no-console */
const camelCase = require('lodash/camelCase');
const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const isArrayLikeObject = require('lodash/isArrayLikeObject');
const isObject = require('lodash/isObject');

function isJsonSupportedValue(value) {
  return !isObject(value) || value instanceof Date;
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
  return mapValues(camelKeyed, v => (isJsonSupportedValue(v) ? v : camelize(v)));
}

module.exports = { camelize };
