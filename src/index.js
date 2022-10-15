require('dotenv').config();
const app = require('./app');
const { connect } = require('./database');

const PORT = process.env.PORT || 8998;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  await connect();
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
