const Fav = require('./fav.model');

const createFav = (fav, userId) => {
  return Fav.create({ ...fav, user: userId });
};

const getAllfavs = () => {
  return Fav.find({}).populate({
    path: 'user',
    select: 'email -_id',
  });
};

const getFavById = (id) => {
  return Fav.findById(id).populate({
    path: 'user',
    select: 'email -_id',
  });
};

const updateFav = (id, fav) => {
  return Fav.findByIdAndUpdate(id, fav, { new: true });
};

const deleteFav = (id) => {
  return Fav.findByIdAndRemove(id);
};
module.exports = { createFav, getAllfavs, getFavById, updateFav, deleteFav };
