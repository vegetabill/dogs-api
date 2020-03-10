const { Router } = require('express');
const { sendData } = require('../util/response-utils');

function build(dogsTable) {
  const root = Router({ mergeParams: true });

  root.get('/', (req, res) => {
    dogsTable.all().then(dogs => sendData(res, dogs));
  });

  const singleResource = Router({ mergeParams: true });
  root.use('/:id', singleResource);

  singleResource.get((req, res) => {
    dogsTable.findById(req.params.id).then(dog => {
      if (dog) {
        sendData(res, dog);
      } else {
        res.sendStatus(404);
      }
    });
  });

  singleResource.put((req, res) => {
    dogsTable.update(req.params.id, req.body).then(() => res.sendStatus(200));
  });

  singleResource.delete((req, res) => {
    dogsTable.delete(req.params.id).then(deleted => {
      res.sendStatus(deleted ? 200 : 404);
    });
  });

  return root;
}

module.exports = build;
