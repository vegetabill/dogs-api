const { makeFetch } = require('supertest-fetch');
const chance = require('chance')();
const { setupApp } = require('../index');

describe('The API', () => {
  let fetch;

  beforeAll(async () => {
    const express = await setupApp();
    fetch = makeFetch(express);
  });

  describe('/owners', () => {
    it('should work with simple CRUD flow', async () => {
      const owner = {
        displayName: chance.name(),
        login: chance.word()
      };
      await fetch(`/owners/${owner.login}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(owner)
      }).expect(201);

      const dog = {
        name: chance.first(),
        breed: 'Pomeranian',
        birthdate: chance.birthday(),
        primaryColor: chance.color()
      };

      await fetch(`/owners/${owner.login}/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
      }).expect(201);

      const dogId = await fetch(`/owners/${owner.login}/dogs`)
        .expect(200)
        .expect('content-type', /json/)
        .then(res => res.json())
        .then(dogs => {
          expect(dogs.length).toBe(1);
          expect(dogs[0].name).toBe(dog.name);
          return dogs[0].id;
        });

      await fetch(`/owners/${owner.login}/dogs/${dogId}`)
        .expect(200)
        .expect('content-type', /json/)
        .then(res => res.json())
        .then(jsonDog => {
          expect(jsonDog.name).toBe(dog.name);
        });

      await fetch(`/owners/${owner.login}/dogs/${dogId}`, {
        method: 'DELETE'
      }).expect(200);

      await fetch(`/owners/${owner.login}/dogs`)
        .expect(200)
        .expect('content-type', /json/)
        .then(res => res.json())
        .then(dogs => {
          expect(dogs.length).toBe(0);
        });

      await fetch(`/owners/${owner.login}`, {
        method: 'DELETE'
      }).expect(200);

      await fetch(`/owners/${owner.login}`).expect(404);
    });
  });
});
