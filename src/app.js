const express = require('express');
const { expressConfig } = require('./express');
const { routesConfig } = require('./routes.config');

const app = express();

expressConfig(app);
routesConfig(app);

module.exports = app;
