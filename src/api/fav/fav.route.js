const express = require('express');
const { list, update, create, destroy, show } = require('./fav.controller');
// const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/new/:listId', create);
router.get('/', list);
router.get('/:favId', show);
router.put('/:favId', update);
router.delete('/:favId', destroy);

module.exports = router;
