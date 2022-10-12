const List = require('../list/list.model');
const {
  createFav,
  getAllfavs,
  getFavById,
  updateFav,
  deleteFav,
} = require('./fav.service');

const create = async (req, res) => {
  const data = req.body;
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    if (!list) {
      throw new Error('List does not exist');
    }
    const fav = await createFav(data, listId);
    list.favs.push(fav);
    await list.save({ validateBeforeSave: false });
    return res.status(201).json({ message: 'fav created', data: fav });
  } catch (err) {
    return res.status(400).json({ message: 'fav not created', data: err });
  }
};

const list = async (req, res) => {
  const { listId } = req.params;
  try {
    const favs = await getAllfavs();
    const favsToSend = favs.filter((fav) => fav.list.toString() === listId);
    return res.status(200).json({ message: 'favs found', data: favsToSend });
  } catch (err) {
    return res.status(400).json({ message: 'favs not found', data: err });
  }
};

const show = async (req, res) => {
  const { favId } = req.params;
  try {
    const fav = await getFavById(favId);
    return res.status(200).json({ message: 'fav found', data: fav });
  } catch (err) {
    return res.status(400).json({ message: 'fav not found', data: err });
  }
};

const update = async (req, res) => {
  const { favId } = req.params;
  const fav = req.body;
  try {
    const favUdated = await updateFav(favId, fav);
    return res.status(200).json({ message: 'fav updated', data: favUdated });
  } catch (err) {
    return res.status(400).json({ message: 'favs not updated', data: err });
  }
};

const destroy = async (req, res) => {
  const { favId } = req.params;
  try {
    const favDeleted = await deleteFav(favId);
    return res.status(200).json({ message: 'fav deleted', data: favDeleted });
  } catch (err) {
    return res.status(400).json({ message: 'favs not deleted', data: err });
  }
};

module.exports = {
  list,
  update,
  create,
  destroy,
  show,
};
