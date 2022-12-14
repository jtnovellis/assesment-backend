const Fav = require('./fav.model');

const createFav = (fav, id) => {
  return Fav.create({ ...fav, list: id });
};

const getAllfavs = () => {
  return Fav.find();
};

const getFavById = (id) => {
  return Fav.findById(id);
};

const updateFav = (id, fav) => {
  return Fav.findByIdAndUpdate(id, fav, { new: true });
};

const deleteFav = (id) => {
  return Fav.findByIdAndRemove(id);
};
module.exports = { createFav, getAllfavs, getFavById, updateFav, deleteFav };
