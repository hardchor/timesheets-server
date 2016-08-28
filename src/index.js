/* eslint-disable import/imports-first */
require('newrelic');
const path = require('path');
const dotenv = require('dotenv-safe');

dotenv.config({
  silent: true,
  sample: path.resolve(__dirname, '..', '.env.dist'),
});

require('./koa');
require('./express');
