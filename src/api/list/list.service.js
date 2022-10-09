const List = require('./list.model');

const createList = (list, userId) => {
  return List.create({ ...list, user: userId });
};

const getAllList = () => {
  return List.find({});
};

const getListById = (id) => {
  return List.findById(id);
};

const updateList = (id, list) => {
  return List.findByIdAndUpdate(id, list, { new: true });
};

const deleteList = (id) => {
  return List.findByIdAndRemove(id);
};

module.exports = {
  createList,
  getAllList,
  getListById,
  updateList,
  deleteList,
};
