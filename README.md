# Express API Reference Implementation

This is a limited reference implementation with API tests. It does not have a web UI.

## How to Run Express Server

`npm start` will start the server in dev mode. Make sure database is loaded already.

### Learning the API

- You can find swagger definition at `/swagger.json`
- To see it as SwaggerUI
  - setup the [Dogs React App repo](https://github.com/vegetabill/dogs-react-app)
  - navigate to `http://localhost:3000/swagger`

### First Time Setup

Like all Node apps, start with `npm install` to install necessary dependencies.

#### Database

- [Install Postgres database](https://github.com/Techtonica/curriculum/blob/master/databases/installing-postgresql.md)

Load schema and seed data

```
npm run db:create
```

This will create the dev database called `dogs-dev`.

## How to Run API Tests

`npm run test:api`

This will create a dogs-api-test DB and run the API tests against it.
