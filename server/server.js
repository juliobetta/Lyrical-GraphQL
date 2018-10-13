const path = require('path');
const result = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  throw result.error;
}

const express = require('express');
const expressGraphQL = require('express-graphql');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webpackConfig = require('../webpack.config.js');
const models = require('./models');
const schema = require('./schema/schema');

const app = express();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_LAB_URI } = process.env;
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_LAB_URI}`;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(
  webpackMiddleware(
    webpack(webpackConfig)
  )
);


module.exports = app;
