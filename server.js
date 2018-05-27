const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const uri = process.env.MONGO_URL;

const app = express();

app.use(helmet());

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
}).then(function(data) {
}).catch(function(error) {
  console.log(error);
});

const Router = require('./api/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(serveStatic(__dirname + "/dist"));

let router = new Router(app);
router.setupRoutes();

const server = app.listen(process.env.PORT || 4509, function() {
  console.log(`Server is running on ${server.address().port}`);
});
