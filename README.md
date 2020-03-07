# Express API Reference Implementation

This is a limited reference implementation with API tests. It does not have a web UI.

## How to Run Express Server

`npm dev` will start the server in dev mode. Make sure database is loaded already.

### First Time Setup

Like all Node apps, start with `npm install` to install necessary dependencies.

#### Database

- [Install Postgres database](https://github.com/Techtonica/curriculum/blob/master/databases/installing-postgresql.md)

Load schema and seed data

```
createdb dogs-dev
psql dogs-dev < db.sql
```

## How to Run API Tests
