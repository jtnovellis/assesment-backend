const user = require('./api/user/user.route');

const routesConfig = (app) => {
  app.use('/api/users', user);
  // app.use('/api/favs');
};

module.exports = { routesConfig };
