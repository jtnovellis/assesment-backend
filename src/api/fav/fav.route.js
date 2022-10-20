const express = require('express');
const { list, update, create, destroy, show } = require('./fav.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/:listId', authenticate, create);
router.get('/:listId', authenticate, list);
router.get('/only/:favId', authenticate, show);
router.put('/:favId', authenticate, update);
router.delete('/:favId', authenticate, destroy);

module.exports = router;
