const {
  createFav,
  getAllfavs,
  getFavById,
  updateFav,
  deleteFav,
} = require('./fav.service');

const create = async (req, res) => {
  const favData = req.body;
  try {
    const fav = await createFav(favData);
    return res.status(201).json({ message: 'fav created', data: fav });
  } catch (err) {
    return res.status(400).json({ message: 'fav not created', data: err });
  }
};

const list = async (_, res) => {
  try {
    const favs = await getAllfavs();
    return res.status(200).json({ message: 'favs found', data: favs });
  } catch (err) {
    return res.status(400).json({ message: 'favs not found', data: err });
  }
};

const show = async (req, res) => {
  const { favId } = req.params;
  try {
    const fav = getFavById(favId);
    return res.status(200).json({ message: 'fav found', data: fav });
  } catch (err) {
    return res.status(400).json({ message: 'favs not found', data: err });
  }
};

const update = async (req, res) => {
  const { favId } = req.params;
  const fav = req.body;
  try {
    const favUdated = updateFav(favId, fav);
    return res.status(200).json({ message: 'fav updated', data: favUdated });
  } catch (err) {
    return res.status(400).json({ message: 'favs not updated', data: err });
  }
};

const destroy = (req, res) => {
  const { favId } = req.params;
  try {
    const favDeleted = deleteFav(favId);
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
