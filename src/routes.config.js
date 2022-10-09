const user = require('./api/user/user.route');
const fav = require('./api/fav/fav.route');

const routesConfig = (app) => {
  app.use('/api/users', user);
  app.use('/api/favs', fav);
};

module.exports = { routesConfig };
