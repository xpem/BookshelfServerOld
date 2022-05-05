const express = require('express');
const routes = require('./Routes/index');
const bodyParser = require("body-parser");
const fb = require("firebase-admin");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
const path = require('path');
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

const db = fb
  .initializeApp({
    credential: fb.credential.cert({
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key.replace(/\\n/g, '\n'),
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
    }),
    databaseURL: process.env.FIREBASE_URL,
  })
  .database();

module.exports = app;