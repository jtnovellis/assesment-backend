const app = require('./app');
const { connect } = require('./database');

const PORT = process.env.PORT || 8998;
const NODE_ENV = process.env.NODE_ENV || 'development';

connect();

app.listen(PORT, () => {
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
