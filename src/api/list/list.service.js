const List = require('./list.model');

const createList = async (data, id) => {
  return List.create({ ...data, user: id });
};

const getAllList = () => {
  return List.find();
};

const getSingleList = (id) => {
  return List.findById(id);
};

const updateList = (id, data) => {
  return List.findByIdAndUpdate(id, data, { new: true });
};

const deleteList = (id) => {
  return List.findByIdAndRemove(id);
};

module.exports = {
  createList,
  getAllList,
  getSingleList,
  updateList,
  deleteList,
};
