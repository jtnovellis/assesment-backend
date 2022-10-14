require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { routesConfig } = require('./routes.config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

routesConfig(app);

module.exports = app;
