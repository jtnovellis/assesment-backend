require('dotenv').config();
const express = require('express');
const { expressConfig } = require('./express');
const { connectDB } = require('./database');
const { routesConfig } = require('./routes.config');

const app = express();

const PORT = process.env.PORT || 8998;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  expressConfig(app);
  await connectDB();
  routesConfig(app);
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
