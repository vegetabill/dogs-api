const { Router } = require('express');
const { createNotAllowedHandler } = require('../util/response-utils');

const { sendData } = require('../util/response-utils');

function build(breedsTable) {
  const router = Router({ mergeParams: true });

  router
    .route('/breeds')
    .get((_, res) => {
      breedsTable.all().then(data => sendData(res, data));
    })
    // We'll just consider breeds an immutable list for now
    // So any non-GET is 405
    .post(createNotAllowedHandler())
    .put(createNotAllowedHandler())
    .delete(createNotAllowedHandler());

  return router;
}

module.exports = build;
