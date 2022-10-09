const Fav = require('./fav.model');

const createFav = (fav) => {
  return Fav.create(fav);
};

const getAllfavs = () => {
  return Fav.find({}).populate('list');
};

const getFavById = (id) => {
  return Fav.findById(id).populate('list');
};

const updateFav = (id, fav) => {
  return Fav.findByIdAndUpdate(id, fav, { new: true });
};

const deleteFav = (id) => {
  return Fav.findByIdAndRemove(id);
};
module.exports = { createFav, getAllfavs, getFavById, updateFav, deleteFav };
