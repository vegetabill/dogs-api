const { Router } = require('express');
const { sendData } = require('../util/response-utils');

function build(ownersTable) {
  const owners = ownersTable;
  const router = Router({ mergeParams: true });

  const singleOwnerRoutes = Router({ mergeParams: true });

  singleOwnerRoutes
    .route('/')
    .put(async (req, res) => {
      const { login } = req.params;
      const created = await owners.createOrUpdateByLogin(login, req.body);
      if (created) {
        res
          .status(201)
          .set('Location', `/owners/${login}`)
          .end();
      } else {
        res.sendStatus(204);
      }
    })
    .get((req, res) => {
      owners.findByLogin(req.params.login).then(data => {
        sendData(res, data[0]);
      });
    });

  router
    .route('/')
    .get((_, res) => {
      owners.all().then(data => sendData(res, data));
    })
    .head((_, res) => {
      owners.count().then(data => {
        res
          .status(200)
          .set('X-Collection-Count', JSON.stringify(data))
          .end();
      });
    });

  router.use('/:login', singleOwnerRoutes);

  return router;
}

module.exports = build;
