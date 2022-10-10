const {
  deleteList,
  createList,
  updateList,
  getAllList,
  getListById,
} = require('./list.service');

const create = async (req, res) => {
  const listData = req.body;
  try {
    const list = await createList(listData);
    return res.status(201).json({ message: 'List created', data: list });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'List could not be created', error: err });
  }
};

const list = async (_, res) => {
  try {
    const lists = await getAllList();
    return res.status(200).json({ message: 'Lists found', data: lists });
  } catch (err) {
    return res.status(400).json({ message: 'Lists not found', error: err });
  }
};

const show = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await getListById(listId);
    return res.status(200).json({ message: 'List found', data: list });
  } catch (err) {
    return res.status(400).json({ message: 'List not found', error: err });
  }
};

const update = async (req, res) => {
  const { listId } = req.params;
  const listData = req.body;
  try {
    const list = await updateList(listId, listData);
    return res.status(200).json({ message: 'List updated', data: list });
  } catch (err) {
    return res.status(400).json({ message: 'List not updated', error: err });
  }
};

const destroy = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await deleteList(listId);
    return res.status(200).json({ message: 'List deleted', data: list });
  } catch (err) {
    return res.status(400).json({ message: 'List not deleted', error: err });
  }
};

module.exports = { list, create, show, update, destroy };
