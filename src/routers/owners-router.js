const { Router } = require('express');
const { sendData } = require('../util/response-utils');

function build(ownersTable, dogsTable) {
  const owners = ownersTable;
  const router = Router({ mergeParams: true });

  const singleOwnerRoutes = Router({ mergeParams: true });
  router.use('/:login', singleOwnerRoutes);

  // Mini-Middleware to load the owner based on the :login param
  const loadOwner = (req, res, next) => {
    owners.findByLogin(req.params.login).then(owner => {
      if (!owner && req.method !== 'PUT') {
        res.sendStatus(404);
      } else {
        // http://expressjs.com/en/api.html#res.locals
        res.locals.owner = owner;
        next();
      }
    });
  };

  singleOwnerRoutes
    .route('/')
    .all(loadOwner)
    .put(async (req, res) => {
      const { login } = req.params;
      const dbAttrs = { login, ...req.body };
      if (!res.locals.owner) {
        owners.insert(dbAttrs).then(() => {
          res
            .status(201)
            .set('Location', `/owners/${login}`)
            .end();
        });
      } else {
        owners.update(dbAttrs).then(() => res.sendStatus(200));
      }
    })
    .get((req, res) => sendData(res, res.locals.owner))
    .delete((req, res) => {
      owners.delete(res.locals.owner.id).then(() => res.sendStatus(200));
    });

  const ownedDogsRoutes = Router({ mergeParams: true });
  singleOwnerRoutes.use('/dogs', ownedDogsRoutes);

  ownedDogsRoutes
    .route('/')
    .all(loadOwner)
    .get((_, res) => {
      dogsTable.findByOwnerId(res.locals.owner.id).then(dogs => {
        sendData(res, dogs);
      });
    })
    .post((req, res) => {
      dogsTable.insert({ ...req.body, ownerId: res.locals.owner.id }).then(newId => {
        res.set('Location', ['', 'owners', req.params.login, 'dogs', newId].join('/'));
        res.sendStatus(201);
      });
    });

  const loadDog = async (req, res, next) => {
    const dog = await dogsTable.findBy({ ownerId: res.locals.owner.id, id: req.params.dogId });
    if (dog) {
      res.locals.dog = dog;
      next();
    } else {
      res.sendStatus(404);
    }
  };

  const singularOwnedDogRoute = Router({ mergeParams: true });
  ownedDogsRoutes.use('/:dogId', singularOwnedDogRoute);

  singularOwnedDogRoute
    .route('/')
    .all(loadOwner)
    .all(loadDog)
    .get((_, res) => sendData(res, res.locals.dog))
    .delete((_, res) => dogsTable.delete(res.locals.dog.id).then(() => res.sendStatus(200)));

  router
    .route('/')
    .get((_, res) => {
      owners.all().then(data => sendData(res, data));
    })
    .head((_, res) => {
      owners.count().then(count => {
        res
          .status(200)
          .set('X-Count', count)
          .end();
      });
    });

  return router;
}

module.exports = build;
