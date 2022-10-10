const express = require('express');
const { show, update, destroy, list, create } = require('./list.controller');
const router = express.Router();

router.get('/', list);
router.post('/', create);
router.get('/:listId', show);
router.put('/:listId', update);
router.delete('/:listId', destroy);

module.exports = router;
