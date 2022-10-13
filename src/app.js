require('dotenv').config();
const express = require('express');
const { expressConfig } = require('./express');
const { connectDB } = require('./database');
const { routesConfig } = require('./routes.config');

const app = express();

expressConfig(app);
connectDB();
routesConfig(app);

module.exports = app;
