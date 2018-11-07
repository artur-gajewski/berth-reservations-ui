const express = require('express');
const cors = require('cors');
const jsf = require('json-schema-faker');
const faker = require('faker');
const schemas = require('./schemas');
const boatTypes = require('./boatTypes');

require('dotenv').config({ path: '.env.development.local' });

jsf.extend('faker', () => faker);

const { API_PORT } = process.env;
const app = express();
app.use(cors());

Object.entries(schemas).forEach(([resource, schema]) => {
  app.get(`/api/${resource}`, (req, res) => res.json(jsf.generate(schema)));
});

app.get(`/api/boat-types`, (req, res) =>
  res.json({
    count: Object.keys(boatTypes).length,
    next: null,
    previous: null,
    results: Object.entries(boatTypes).map(([identifier, name]) => ({
      identifier,
      name
    }))
  })
);

app.listen(API_PORT, () => console.log(`API running on port ${API_PORT}!`));
