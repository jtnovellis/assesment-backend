const {
  createList,
  getAllList,
  getSingleList,
  updateList,
  deleteList,
} = require('./list.service');
const User = require('../user/user.model');

const create = async (req, res) => {
  const data = req.body;
  const id = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('The user does not exist');
    }
    const list = await createList(data, id);
    user.lists.push(list);
    await user.save({ validateBeforeSave: false });
    return res.status(201).json({ message: 'List created', data: list });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'List could not be created', error: err });
  }
};

const allList = async (req, res) => {
  const id = req.user;
  try {
    const lists = await getAllList();
    const listsToSend = lists.filter((list) => list.user === id);
    return res.status(200).json({ message: 'Lists found', data: listsToSend });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Lists could not be found', error: err });
  }
};

const show = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await getSingleList(listId);
    return res.status(200).json({ message: 'List found', data: list });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'List could not be found', error: err });
  }
};

const update = async (req, res) => {
  const { listId } = req.params;
  const listData = req.body;
  try {
    const list = await updateList(listId, listData);
    return res.status(200).json({ message: 'List updated', data: list });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'List could not be updated', error: err });
  }
};

const destroy = (req, res) => {
  const { listId } = req.params;
  try {
    const listDeleted = deleteList(listId);
    return res.status(200).json({ message: 'List deleted', data: listDeleted });
  } catch (err) {
    return res.status(400).json({ message: 'List not deleted', data: err });
  }
};

module.exports = { create, allList, show, update, destroy };
