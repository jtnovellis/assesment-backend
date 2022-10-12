const express = require('express');
const { create, allList, show, update, destroy } = require('./list.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, allList);
router.get('/:listId', authenticate, show);
router.put('/:listId', authenticate, update);
router.delete('/:listId', authenticate, destroy);

module.exports = router;
