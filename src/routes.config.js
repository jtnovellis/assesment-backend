const user = require('./api/user/user.route');
const fav = require('./api/fav/fav.route');
const list = require('./api/list/list.route');

const routesConfig = (app) => {
  app.get('/', (_, res) => {
    res.status(200).send('FAVS API REST');
  });
  app.use('/api/auth/local', user);
  app.use('/api/favs', fav);
  app.use('/api/lists', list);
};

module.exports = { routesConfig };
