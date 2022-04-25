const express = require('express');
const routes = require('./routes/index');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
const path = require('path');
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

module.exports = app;