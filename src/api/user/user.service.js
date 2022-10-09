const User = require('./user.model');

const signUp = (user, encPassword) => {
  return User.create({ ...user, password: encPassword });
};

const signIn = (email) => {
  return User.findOne({ email }).populate('favs');
};

module.exports = { signUp, signIn };
